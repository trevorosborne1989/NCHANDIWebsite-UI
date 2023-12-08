import React from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import { yupSchema } from './ValidationSchema';
import UploadCard from './UploadCard';

export default {
    title: 'UploadCard',
    component: UploadCard,
  };

export const Primary = ({...props}) => {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      resourceTitle: '',
      file: null
    },
    onSubmit: async (values) => {
      try {
        // await nchandiWebsiteService.postPanelMaterial({}, values);
        enqueueSnackbar('This resource was successfully uploaded.', snackbarMessages.success.configuration);
        formik.handleReset();
      } catch (err) {
        enqueueSnackbar('There was an error when uploading this resource, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  /**
   *
   */
  const handleSave = () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (formik.errors?.resourceTitle) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all the required * fields.', snackbarMessages.error.configuration);
      }
      if (formik.errors?.file) {
        enqueueSnackbar(formik.errors?.file, snackbarMessages.error.configuration);
      };
      formik.setSubmitting(false);
    }, 5000);
  };

  return (
    <>
      <UploadCard
        formik={formik}
        onSave={handleSave}
      />
    </>
  );
};