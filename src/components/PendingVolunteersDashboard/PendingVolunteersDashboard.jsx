import React, { useState, useEffect, useCallback } from 'react';
import {
  Divider,
  IconButton,
  Typography,
  Skeleton,
  Box,
  Tooltip,
} from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer } from '@mui/x-data-grid';
import { DeleteForever, CheckCircleOutline, Wc, Man, Woman, Pause, FiberNew } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import SaveConfirmationDialog from '../SaveConfirmationDialog/SaveConfirmationDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { nchandiTheme, nchandiTableStyles } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const formatPhone = (phone) => {
  if (phone.length === 0) return;
  let areaCode = phone.substr(1, 3);
  let first3 = phone.substr(4, 3);
  let last4 = phone.substr(7, 4);
  return (areaCode + '-' + first3 + '-' + last4);
};

const generateTableConfig = (handleSave, handleDelete, handleGenderColumn, handleIsStandbyColumn, handleStandby) => ({
  slots: { toolbar: () => {
      return (
        <GridToolbarContainer sx={{ backgroundColor: nchandiTheme.handiSecondaryWhite }}>
          <GridToolbar />
        </GridToolbarContainer>
      )
    }
  },
  columns: [
    { field: 'id', headerName: 'ID', width: 0, visible: false },
    { field: 'approve', headerName: '', width: 30, renderCell: (params) => (
        <IconButton>
          <CheckCircleOutline fontSize='large' color='info' onClick={(e) => handleSave(e, params?.row)} data-cy='table-confirm-btn' />
        </IconButton>
      )
    },
    { field: 'dismiss', headerName: '', width: 30, renderCell: (params) => (
        <IconButton>
          <DeleteForever fontSize='large' color='error' onClick={(e) => handleDelete(e, params?.row)} data-cy='table-delete-btn' />
        </IconButton>
      )
    },
    { field: 'isStandby', headerName: 'On Standby', width: 125, align: 'center', headerAlign: 'center', renderCell: (params) => (handleIsStandbyColumn(params?.row))},
    { field: 'createdDate', headerName: 'Request Date', width: 150 },
    { field: 'fullName', headerName: 'Full Name', width: 200, valueFormatter: (value, row) => row?.firstName + ' ' + row?.lastName },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone #', width: 150, valueFormatter: (value, row) => value ? formatPhone(value) : '' },
    { field: 'preferredContactMethod', headerName: 'Contact Method', width: 150 },
    { field: 'facilityName', headerName: 'Facility', width: 250 },
    { field: 'dayOfWeek', headerName: 'Day', width: 125 },
    { field: 'weekOfMonth', headerName: 'Week', width: 75 },
    { field: 'eventTime', headerName: 'Time', width: 100 },
    { field: 'numberNeeded', headerName: '# Needed', width: 100 },
    { field: 'gender', headerName: 'Panel Gender', width: 150, renderCell: (params) => (handleGenderColumn(params?.row)) },
  ]
});

const PendingVolunteersDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pending, setPending] = useState('');
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  /**
   *
   */
  const fetchTableData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: pendings } = await nchandiWebsiteService.getPendings();
      setTableData(pendings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   *
   */
  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  /**
   *
   */
  const handleGenderColumn = (row) => {
    if (row?.gender === 'Male') {
      return <IconButton sx={{ color: nchandiTheme.handiCyan }} >
          <Box>
            <Man fontSize='large' />
          </Box>
        </IconButton>
    } else if (row?.gender === 'Female') {
        return <IconButton sx={{ color: nchandiTheme.handiLightGreen }}>
            <Box>
              <Woman fontSize='large' />
            </Box>
          </IconButton>
    } else {
      return <IconButton sx={{ color: nchandiTheme.handiLightCoral }}  >
          <Box>
            <Wc fontSize='large' />
          </Box>
        </IconButton>
    }
  };

  /**
   *
   */
  const handleIsStandbyColumn = (row) => {
    if (row?.isStandby) {
      return <Tooltip title="Yes" placement='right-end' arrow>
          <IconButton sx={{ color: nchandiTheme.handiLightCoral }} >
            <Box>
              <Pause fontSize='large' onClick={(e) => handleStandby(e, row)} />
            </Box>
          </IconButton>
        </Tooltip>
    } else {
        return <Tooltip title="No" placement='right-end' arrow>
          <IconButton sx={{ color: nchandiTheme.handiCyan }}>
              <Box>
                <FiberNew fontSize='large' onClick={(e) => handleStandby(e, row)} />
              </Box>
            </IconButton>
          </Tooltip>
    }
  }

  /**
   *
   */
  const handleSave = (e, row) => {
    e.stopPropagation();
    setPending(row);
    setIsSaveDialogOpen(true);
  };

  /**
   *
   */
  const handleSaveDialogClose = () => {
    setPending('');
    setIsSaveDialogOpen(false);
  };

  /**
   *
   */
  const handleSaveDialogConfirm = async () => {
    setLoading(true);
    const { id } = pending;
    try {
      await nchandiWebsiteService.approvePending({}, id, pending);
      enqueueSnackbar('This pending volunteer has been added.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error adding the pending volunteer!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setPending('');
      setTableData(tableData.filter(row => row?.id !== id));
      setIsSaveDialogOpen(false);
    }
  };

  /**
   *
   */
  const handleStandby = async (e, row) => {
    e.stopPropagation();
    row.isStandby = !row.isStandby;
    let date = row.createdDate;
    delete row.createdDate;
    setLoading(true);
    const { id } = row;
    try {
      await nchandiWebsiteService.putPendingWithPendingId({}, id, row);
      enqueueSnackbar('Standby changed for this volunteer.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error changing standby for this volunteer!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setPending('');
      row.createdDate = date;
      setTableData(prevData =>
          prevData.map(item =>
            item.id === id
              ? { ...item, ...row }
              : item
          )
        );
    }
  };

  /**
   *
   */
  const handleDelete = (e, row) => {
    e.stopPropagation();
    setPending(row);
    setIsDeleteDialogOpen(true);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setPending('');
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    setLoading(true);
    const { id } = pending;
    try {
      await nchandiWebsiteService.deletePendingWithPendingId({}, id);
      enqueueSnackbar('This pending volunteer was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the pending volunteer!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setPending('');
      setTableData(tableData.filter(row => row?.id !== id));
      setIsDeleteDialogOpen(false);
    }
  };

  const tableConfig = generateTableConfig(handleSave, handleDelete, handleGenderColumn, handleIsStandbyColumn, handleStandby);

  return (
    <>
    {loading}
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} pb={3}>
        <Grid sm={10}>
          <Typography variant="h4" color={'white'} >
            Pending Volunteers Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Grid container sm={12} justifyContent={'center'} pb={5}>
        <Grid sm={8}>
          <Divider sx={{background: 'white'}} />
        </Grid>
      </Grid>
      <Grid container sm={12} justifyContent={'center'}>
        {loading ?
          <Skeleton variant='rectangular' width='90%' height={250}/>
          :
          <Grid sm={11} height={500} width={'100%'}>
            <DataGrid
              rows={tableData}
              rowSelectionModel={pending}
              loading={loading}
              {...tableConfig}
              {...nchandiTableStyles}
            />
          </Grid>
        }
      </Grid>
      <SaveConfirmationDialog
        isOpen={isSaveDialogOpen}
        entityName='Pending Volunteer'
        primaryText={pending?.firstName + ' ' + pending?.lastName}
        handleClose={handleSaveDialogClose}
        handleSave={handleSaveDialogConfirm}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        entityName='Pending Volunteer'
        primaryText={pending?.firstName + ' ' + pending?.lastName}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default PendingVolunteersDashboard;