import React, { useState } from 'react';
import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import CommitteeDashboardDialog from '../CommitteeDashboardDialog/CommitteeDashboardDialog';
import { yupSchema } from './ValidationSchema';

const CommitteeDashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const handleNew = () => {
    setDialogOpen(true);
  };

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