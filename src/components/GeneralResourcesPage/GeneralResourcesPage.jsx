import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import { yupSchema } from './ValidationSchema';
import UploadCard from '../UploadCard/UploadCard';
import ShowUploadsCard from '../ShowUploadsCard/ShowUploadsCard';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

function createData(id, label) {
  return {
    id,
    label,
  };
}

const generalResources = [
  createData('1', 'North County H&I Policies'),
  createData('2', 'H&I Informational Brochure'),
  createData('3', 'Sign Up For Panel On Website Video'),
  createData('4', 'Summer Service Fair Flyer'),
  createData('5', 'Virtual Panel Flyer'),
  createData('6', 'Green Can Label'),
  createData('7', 'Orientation Checklist'),
  createData('8', 'Green Can Description')
];

const GeneralResourcesPage = () => {
  const [listData, setListData] = useState(generalResources);
  const [generalResource, setGeneralResource] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      resourceTitle: '',
      file: null
    },
    onSubmit: async (values) => {
      try {
        // await nchandiWebsiteService.postGeneralResource({}, values);
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

  // const fetchData = useCallback(params => nchandiWebsiteService.getGeneralResources(params), []); //Try This!!!

  /**
   *
   */
  const fetchListData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: generalResources } = await nchandiWebsiteService.getGeneralResources();
      setListData(generalResources);
    } catch (err) {
      enqueueSnackbar('Unable to fetch current general resources, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, [enqueueSnackbar]);

  /**
   *
   */
  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

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

  /**
   *
   */
  const handleDelete = (e, entity) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
    setGeneralResource(entity);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setGeneralResource(null);
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    // setLoading(true);
    try {
      // const { id } = generalResource;
      // await nchandiWebsiteService.deleteGeneralResourceById(id);
      enqueueSnackbar('This resource was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting this resource!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setGeneralResource(null);
      setIsDeleteDialogOpen(false);
      // fetchRequests();
    }
  };

  // const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete);

  return (
    <>
      <Grid container sm={12} spacing={3} justifyContent={'center'}>
        <Grid sx={12} sm={6}>
          <UploadCard
            formik={formik}
            onSave={handleSave}
          />
        </Grid>
        <Grid sx={12} sm={6} >
          <ShowUploadsCard
            resourceData={listData}
            isOpen={isDeleteDialogOpen}
            entityName={'General Resource'}
            cardTitle={'General Resources'}
            primaryText={generalResource?.label}
            handleClose={handleDeleteDialogClose}
            handleDelete={handleDelete}
            handleDeleteConfirm={handleDeleteDialogConfirm}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default GeneralResourcesPage;