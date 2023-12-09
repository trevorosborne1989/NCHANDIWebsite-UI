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

const archivedReports = [
  createData('1', '2024 Proposed Budget'),
  createData('2', 'Green Can Special Report'),
  createData('3', '2023 Proposed Budget'),
];

const ArchivedReportsPage = () => {
  const [listData, setListData] = useState(archivedReports);
  const [archivedReport, setArchivedReport] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      resourceTitle: '',
      file: null
    },
    onSubmit: async (values) => {
      try {
        // await nchandiWebsiteService.postArchivedReport({}, values);
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

  // const fetchData = useCallback(params => nchandiWebsiteService.getArchivedReports(params), []); //Try This!!!

  /**
   *
   */
  const fetchListData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: archivedReports } = await nchandiWebsiteService.getArchivedReports();
      setListData(archivedReports);
    } catch (err) {
      enqueueSnackbar('Unable to fetch current archived reports, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
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
    setArchivedReport(entity);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setArchivedReport(null);
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    // setLoading(true);
    try {
      // const { id } = archivedReport;
      // await nchandiWebsiteService.deleteArchivedReportById(id);
      enqueueSnackbar('This resource was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting this resource!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setArchivedReport(null);
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
            entityName={'Archived Report'}
            cardTitle={'Archived Reports'}
            primaryText={archivedReport?.label}
            handleClose={handleDeleteDialogClose}
            handleDelete={handleDelete}
            handleDeleteConfirm={handleDeleteDialogConfirm}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ArchivedReportsPage;