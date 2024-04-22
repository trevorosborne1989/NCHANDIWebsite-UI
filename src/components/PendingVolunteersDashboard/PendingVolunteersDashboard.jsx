import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, } from '@mui/material';
import { DeleteForever, CheckCircleOutline } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import SaveConfirmationDialog from '../SaveConfirmationDialog/SaveConfirmationDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const generateTableConfig = (handleSave, handleDelete) => ({
  title: 'Pending Volunteers',
  dataKey: d => d.id,
  columns: [
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <CheckCircleOutline fontSize='large' color='success' onClick={e => handleSave(e, d)} data-cy='table-confirm-btn' /> },
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <DeleteForever fontSize='large'  color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /> },
    { columnName: 'fullName', numeric: true, disablePadding: false, label: 'Full Name', value: d => d.firstName + ' ' + d.lastName },
    { columnName: 'email', numeric: true, disablePadding: false, label: 'Email', value: d => d.email },
    { columnName: 'phone', numeric: true, disablePadding: false, label: 'Phone', value: d => d.phone },
    { columnName: 'preferredContactMethod', numeric: true, disablePadding: false, label: 'Preferred Contact Method', value: d => d.preferredContactMethod },
    { columnName: 'facilityName', numeric: true, disablePadding: false, label: 'Facility', value: d => d.facilityName },
    { columnName: 'dayOfWeek', numeric: true, disablePadding: true, label: 'Day of Week', value: d => d.dayOfWeek },
    { columnName: 'weekOfMonth', numeric: true, disablePadding: true, label: 'Week of Month', value: d => d.weekOfMonth },
    { columnName: 'eventTime', numeric: true, disablePadding: false, label: 'Time', value: d => d.eventTime },
    { columnName: 'numberNeeded', numeric: true, disablePadding: false, label: 'Number Needed', value: d => d.numberNeeded },
    { columnName: 'gender', numeric: true, disablePadding: false, label: 'Panel Gender', value: d => d.gender },
  ]
});

const PendingVolunteersDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pending, setPending] = useState(null);
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
  const handleSave = (e, entity) => {
    e.stopPropagation();
    setIsSaveDialogOpen(true);
    setPending(entity);
  };

  /**
   *
   */
  const handleSaveDialogClose = () => {
    setPending(null);
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
      setPending(null);
      setIsSaveDialogOpen(false);
    }
  };

  /**
   *
   */
  const handleDelete = (e, entity) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
    setPending(entity);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setPending(null);
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
      fetchTableData();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the pending volunteer!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setPending(null);
      setIsDeleteDialogOpen(false);
      fetchTableData();
    }
  };

  const tableConfig = generateTableConfig(handleSave, handleDelete);

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
        <Grid sm={12}>
          <EnhancedTable
            data={tableData}
            {...tableConfig}
          />
        </Grid>
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