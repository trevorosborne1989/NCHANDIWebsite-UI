import React, {useState} from 'react';
import PanelsDashboardDialog from './PanelsDashboardDialog';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { useFormik } from 'formik';
import { yupSchema } from './ValidationSchema';
import { Box, Button } from '@mui/material';


export default {
    title: 'PanelsDashboardDialog',
    component: PanelsDashboardDialog,
  };

  export const Primary = ({...props}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const formik = useFormik({
      initialValues: {
        id: '',
        dayOfWeek: '',
        weekOfMonth: '',
        time: '',
        facility: null,
        gender: '',
        membersAreNeeded: false,
        numberNeeded: 0,
        boardChampion: '',
        panelCoordinator: '',
        panelLeader: '',
        panelMember1: '',
        panelMember2: '',
        panelMember3: '',
        panelMember4: '',
        panelMember5: ''
      },
      onSubmit: async () => {
        try {
          // await post method()   Use await here.
          enqueueSnackbar('This panel member was successfully submitted.', snackbarMessages.success.configuration);
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
            <Button variant='contained' onClick={handleClick}>Open Panel Members Dialog</Button>
          </Box>
          <PanelsDashboardDialog
          formik={formik}
          isOpen={dialogOpen}
          handleSave={handleDialogSave}
          handleClose={handleDialogClose}
          >
          </PanelsDashboardDialog>
        </>
      );
    };