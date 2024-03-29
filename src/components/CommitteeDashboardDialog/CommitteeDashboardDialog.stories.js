import React, {useState} from 'react';
import CommitteeDashboardDialog from './CommitteeDashboardDialog';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { useFormik } from 'formik';
import { yupSchema } from './ValidationSchema';
import { Box, Button } from '@mui/material';


export default {
    title: 'CommitteeDashboardDialog',
    component: CommitteeDashboardDialog,
  };

  export const Primary = ({...props}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
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
          enqueueSnackbar('This committee member was successfully submitted.', snackbarMessages.success.configuration);
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
          enqueueSnackbar('There are fields missing in your form. Please fill out all the required * fields.', snackbarMessages.error.configuration);
        }
        formik.setSubmitting(false);
      }, 1000);
    };

    const handleDialogClose = () => {
      formik.handleReset();
      setDialogOpen(false);
    };

    const handleClick = () => {
      setDialogOpen(true);
    };

      return (
        <>
          <Box textAlign={'center'} py={7}>
            <Button variant='contained' onClick={handleClick}>Open Committee Members Dialog</Button>
          </Box>
          <CommitteeDashboardDialog
          formik={formik}
          isOpen={dialogOpen}
          handleSave={handleDialogSave}
          handleClose={handleDialogClose}
          >
          </CommitteeDashboardDialog>
        </>
      );
    };