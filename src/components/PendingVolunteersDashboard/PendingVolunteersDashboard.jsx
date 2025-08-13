import React, { useState, useEffect, useCallback } from 'react';
import {
  Divider,
  IconButton,
  Typography,
  Skeleton,
  Box
} from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer } from '@mui/x-data-grid';
import { DeleteForever, CheckCircleOutline, Wc, Man, Woman } from '@mui/icons-material';
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

const generateTableConfig = (handleSave, handleDelete, handleGenderColumn) => ({
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
    { field: 'approve', headerName: '', width: 75, renderCell: (params) => (
        <IconButton>
          <CheckCircleOutline fontSize='large' color='info' onClick={(e) => handleSave(e, params?.row?.id)} data-cy='table-confirm-btn' />
        </IconButton>
      )
    },
    { field: 'dismiss', headerName: '', width: 75, renderCell: (params) => (
        <IconButton>
          <DeleteForever fontSize='large' color='error' onClick={(e) => handleDelete(e, params?.row?.id)} data-cy='table-delete-btn' />
        </IconButton>
      )
    },
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
  const handleSave = (e, id) => {
    e.stopPropagation();
    if (id.length !== 0) {
      console.log(id);
      setPending((tableData.filter(row => row?.id === id))[0]);
      setIsSaveDialogOpen(true);
    }
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
    try {
      const { id } = pending;
      await nchandiWebsiteService.approvePending({}, id, pending);
      fetchTableData();
      enqueueSnackbar('This pending volunteer has been added.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error adding the pending volunteer!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setPending('');
      setIsSaveDialogOpen(false);
      fetchTableData();
    }
  };

  /**
   *
   */
  const handleDelete = (e, id) => {
    e.stopPropagation();
    setPending((tableData.filter(row => row?.id === id))[0]);
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
    try {
      const { id } = pending;
      await nchandiWebsiteService.deletePendingWithPendingId({}, id);
      enqueueSnackbar('This pending volunteer was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the pending volunteer!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setPending('');
      setIsDeleteDialogOpen(false);
      fetchTableData();
    }
  };

  const tableConfig = generateTableConfig(handleSave, handleDelete, handleGenderColumn);

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