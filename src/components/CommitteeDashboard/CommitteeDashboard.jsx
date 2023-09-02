import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import CommitteeDashboardDialog from '../CommitteeDashboardDialog/CommitteeDashboardDialog';
import { yupSchema } from './ValidationSchema';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

function createData(panelId, dayOfWeek, weekOfMomth, time, facility, gender, numberNeeded) {
  return {
    panelId,
    dayOfWeek,
    weekOfMomth,
    time,
    facility,
    gender,
    numberNeeded,
  };
}

const comitteeMembers = [
  createData('1', 'Tuesday', 1, '7:00 AM', 'First Step House', 'Male', 5),
  createData('2','Friday', 3, '8:00 AM', 'First Step House', 'Female', 1),
  createData('3','Wednesday', 2, '7:00 PM', 'Tri-City', 'Male/Female', 4),
  createData('4','Saturday', 1, '5:00 PM', 'First Step House', 'Female', 5),
  createData('5','Thrsday', 1, '10:00 AM', 'Crown View', 'Male', 2),
  createData('6','Monday', 3, '7:00 PM', 'Sober Recovery', 'Male', 3),
  createData('7','Wednesday', 3, '7:00 AM', 'Recovered Sisters', 'Female', 3),
  createData('8','Friday', 2, '7:00 AM', 'First Step House', 'Male', 5),
  createData('9','Tuesday', 4, '5:00 PM', 'Tri-City', 'Male', 4),
  createData('10','Saturday', 5, '10:00 AM', 'Sober Recovery', 'Male', 1),
  createData('11','Friday', 1, '12:30 PM', 'First Step House', 'Male', 2),
  createData('12','Monday', 2, '4:00 PM', 'Tri-City', 'Female', 1),
  createData('13','Wednsesday', 3, '9:00 AM', 'Crown View', 'Male/Female', 3),
  createData('14','Thursday', 1, '10:00 AM', 'Carlsbad Recovery', 'Male', 1),
  createData('15','Sunday', 4, '12:00 PM', 'Recovered Sisters', 'Female', 5),
  createData('16','Saturday', 2, '8:00 AM', 'Carlsbad Recovery', 'Male', 4)
];

const CommitteeDashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  // const [rowData, setRowData] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      contactMethod: '',
      commitment: ''
    },
    onSubmit: async () => {
      try {
        // await post method()   Use await here.
        // How do you know when to use PUT instead for an update of a row?
        enqueueSnackbar('This volunteer request was successfully submitted.', snackbarMessages.success.configuration);
        handleDialogClose();
      } catch (err) {
        enqueueSnackbar('There was an error when submitting this form, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  const fetchTableData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: comitteeMembers } = await nchandiWebsiteService.getComitteeMembers();
      setTableData(comitteeMembers);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const handleDialogSave = () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all required * fields.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
    }, 1000);
  };

  const handleDialogClose = () => {
    formik.handleReset();
    setDialogOpen(false);
  };

  // const handleNew = () => {
  //   setDialogOpen(true);
  // };

  const handleRowSelection = (row) => {
    // setRowData(row);
    setDialogOpen(true);
  };

  return (
    <>
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} py={3} pb={3}>
        <Grid sm={10}>
          <Typography variant="h4" color={'white'} >
            Committee Dashboard
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
            title={'Committee Members'}
            handleSelection={handleRowSelection}
            data ={tableData}
          />
        </Grid>
      </Grid>
      <CommitteeDashboardDialog
        formik={formik}
        // data={rowData}
        isOpen={dialogOpen}
        handleSave={handleDialogSave}
        handleClose={handleDialogClose}
      />
    </>
  )
}

export default CommitteeDashboard;