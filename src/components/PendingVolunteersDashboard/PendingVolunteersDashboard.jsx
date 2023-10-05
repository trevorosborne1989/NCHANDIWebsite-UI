import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, } from '@mui/material';
import { Done, DeleteForever, CheckCircle, CheckCircleOutline } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import SaveConfirmationDialog from '../SaveConfirmationDialog/SaveConfirmationDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

const generateTableConfig = (handleSave, handleDelete) => ({
  title: 'Pending Volunteers',
  dataKey: d => d.id,
  columns: [
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <CheckCircleOutline fontSize='large' color='success' onClick={e => handleSave(e, d)} data-cy='table-confirm-btn' /> },
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <DeleteForever fontSize='large'  color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /> },
    { columnName: 'fullName', numeric: true, disablePadding: false, label: 'Full Name', value: d => d.fullName },
    { columnName: 'email', numeric: true, disablePadding: false, label: 'Email', value: d => d.email },
    { columnName: 'phone', numeric: true, disablePadding: false, label: 'Phone', value: d => d.phone },
    { columnName: 'facility', numeric: true, disablePadding: false, label: 'Facility', value: d => d.facility },
    { columnName: 'dayOfWeek', numeric: true, disablePadding: true, label: 'Day of Week', value: d => d.dayOfWeek },
    { columnName: 'weekOfMonth', numeric: true, disablePadding: true, label: 'Week of Month', value: d => d.weekOfMonth },
    { columnName: 'time', numeric: true, disablePadding: false, label: 'Time', value: d => d.time }
  ]
});

function createData(id, fullName, email, phone, facility, dayOfWeek, weekOfMonth, time) {
  return {
    id,
    fullName,
    email,
    phone,
    facility,
    dayOfWeek,
    weekOfMonth,
    time
  };
}

const pendingVolunteers = [
  createData('1', 'Theresa Johnston', 'tjohnston@gmail.com', '858-432-5617', 'First Step House', 'Tuesday', 1, '9:00 AM'),
  createData('2', 'Monica Johnston', 'tjohnston@gmail.com', '760-432-5617', 'First Step House', 'Wednesday', 2, '6:00 AM'),
  createData('3', 'Brad Terry', 'tjohnston@gmail.com', '123-432-5617', 'First Step House', 'Friday', 3, '10:00 AM'),
  createData('4', 'Philip Mueson', 'tjohnston@gmail.com', '760-432-1232', 'First Step House', 'Sunday', 4, '11:00 AM'),
  createData('5', 'Greg Orlando', 'tjohnston@gmail.com', '760-432-1222', 'First Step House', 'Wednesday', 1, '8:00 AM'),
  createData('6', 'Thomas Fernando', 'tjohnston@gmail.com', '250-432-5617', 'First Step House', 'Saturday', 2, '7:00 AM'),
  createData('7', 'Hans Somar', 'tjohnston@gmail.com', '760-546-5617', 'First Step House', 'Tuesday', 3, '7:00 AM'),
  createData('8', 'Garry Hue', 'tjohnston@gmail.com', '760-432-6786', 'First Step House', 'Friday', 4, '7:00 PM'),
  createData('9', 'Sara Clark', 'tjohnston@gmail.com', '760-432-5617', 'First Step House', 'Monday', 3, '9:00 PM'),
  createData('10', 'Don Johnston', 'tjohnston@gmail.com', '760-432-9098', 'First Step House', 'Tuesday', 2, '10:00 PM'),
  createData('11', 'Gary Winnis', 'tjohnston@gmail.com', '858-432-5617', 'First Step House', 'Wednesday', 1, '12:00 PM'),
  createData('12', 'Tommy Hunt', 'tjohnston@gmail.com', '760-432-5617', 'First Step House', 'Tuesday', 1, '7:00 AM')
];

const PendingVolunteersDashboard = () => {
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pendingVolunteer, setPendingVolunteer] = useState(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // const fetchData = useCallback(params => ectsService.getEctsstaff(params), []); //Try This!!!

   /**
   *
   */
  const fetchTableData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: facilities } = await nchandiWebsiteService.getFacilities);
      setTableData(pendingVolunteers);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(No);
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
  const handleSave = (e, id) => {
    e.stopPropagation();
    setIsSaveDialogOpen(true);
    setPendingVolunteer(id);
  };

  /**
   *
   */
  const handleSaveDialogClose = () => {
    setPendingVolunteer(null);
    setIsSaveDialogOpen(false);
  };

  /**
   *
   */
  const handleSaveDialogConfirm = async () => {
    // setLoading(true);
    try {
      // const { id } = pendingVolunteer;
      // await nchandiWebsiteService.saveRequestById(id);
      enqueueSnackbar('This pending volunteer has been added.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error adding the pending volunteer!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setPendingVolunteer(null);
      setIsSaveDialogOpen(false);
      // fetchRequests();
    }
  };

  /**
   *
   */
  const handleDelete = (e, id) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
    setPendingVolunteer(id);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setPendingVolunteer(null);
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    // setLoading(true);
    try {
      // const { id } = pendingVolunteer;
      // await nchandiWebsiteService.deletePendingVolunteerById(id);
      enqueueSnackbar('This pending volunteer was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the pending volunteer!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setPendingVolunteer(null);
      setIsDeleteDialogOpen(false);
      // fetchRequests();
    }
  };

  const tableConfig = generateTableConfig(handleSave, handleDelete);

  return (
    <>
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} py={3} pb={3}>
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
        primaryText={pendingVolunteer?.fullName}
        handleClose={handleSaveDialogClose}
        handleSave={handleSaveDialogConfirm}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        entityName='Pending Volunteer'
        primaryText={pendingVolunteer?.fullName}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default PendingVolunteersDashboard;