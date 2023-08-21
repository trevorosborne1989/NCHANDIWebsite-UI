import { Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import EnhancedTable from "../EnhancedTable/EnhancedTable";
import Grid from '@mui/material/Unstable_Grid2';
import PanelsDialog from "../PanelsDialog/PanelsDialog";
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import { yupSchema } from './ValidationSchema';

const Panels = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [facilityData, setFacilityData] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      commitment: '',
      email: '',
      phoneNumber: '',
      contactMethod: ''
    },
    onSubmit: async () => {
      try {
        // await post method()   Use await here.
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
      const errors = await formik.validateForm();
      console.log(errors);
      console.log(Object.keys(errors).length );

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

  const handleRowSelection = (row) => {
    // setFacilityData(row);
    setDialogOpen(true);
  };

  return (
    <>
      <Grid container sm={12} textAlign={'center'} justifyContent={'center'} py={3} pb={7}>
        <Grid sm={10}>
          <Typography variant="h3" color={'white'} >
            Panels
          </Typography>
        </Grid>
      </Grid>
      <Grid container sm={12} justifyContent={'center'} pb={7}>
        <Grid sm={10}>
          <Divider sx={{background: 'white'}} />
        </Grid>
      </Grid>
      <Grid container  sm={12} justifyContent={'center'} pb={7}>
        <Grid sm={11}>
          <EnhancedTable
            handleSelection={handleRowSelection}
          />
        </Grid>
      </Grid>
      <PanelsDialog
        formik={formik}
        // data={facilityData}
        isOpen={dialogOpen}
        handleSave={handleDialogSave}
        handleClose={handleDialogClose}
      />
    </>
  )
}

export default Panels;