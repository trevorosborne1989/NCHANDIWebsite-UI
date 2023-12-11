import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import { yupSchema } from './ValidationSchema';
import UploadReportsCard from '../UploadReportsCard/UploadReportsCard';
import ShowReportsCard from '../ShowReportsCard/ShowReportsCard';

function createData(id, monthOfYear, financialReport, minutes) {
  return {
    id,
    monthOfYear,
    financialReport,
    minutes
  };
}

const monthlyReports = [
  createData('1', 'January', Object.create(null), Object.create(null)),
  createData('2', 'Februaray', Object.create(null), Object.create(null)),
  createData('3', 'March', Object.create(null), Object.create(null)),
  createData('4', 'April', Object.create(null), Object.create(null)),
  createData('5', 'May', Object.create(null), Object.create(null)),
  createData('6', 'June', Object.create(null), Object.create(null)),
  createData('7', 'July', Object.create(null), Object.create(null)),
  createData('8', 'August', Object.create(null), Object.create(null)),
  createData('9', 'September', Object.create(null), Object.create(null)),
  createData('10', 'October', Object.create(null), Object.create(null)),
  createData('11', 'November', Object.create(null), Object.create(null)),
  createData('12', 'December', Object.create(null), Object.create(null)),
];

const MonthlyReportsPage2 = () => {
  const [listData, setListData] = useState(monthlyReports);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      monthOfYear: '',
      isFinancialReport: false,
      financialReport: null,
      isMinutes: false,
      minutes: null
    },
    onSubmit: async (values) => {
      try {
        // await nchandiWebsiteService.postMonthlyReport({}, values);
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

  // const fetchData = useCallback(params => nchandiWebsiteService.getMonthlyReports(params), []); //Try This!!!

  /**
   *
   */
  const fetchListData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: monthlyReports } = await nchandiWebsiteService.getAmonthlyReports();
      setListData(monthlyReports);
    } catch (err) {
      enqueueSnackbar('Unable to fetch current monthly reports, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
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
    setMonthlyReport(entity);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setMonthlyReport(null);
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    // setLoading(true);
    try {
      // const { id } = monthlyReport;
      // await nchandiWebsiteService.deleteMonthlyReportById(id);
      enqueueSnackbar('This resource was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting this resource!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setMonthlyReport(null);
      setIsDeleteDialogOpen(false);
      // fetchRequests();
    }
  };

  // const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete);

  return (
    <>
      <Grid container sm={12} spacing={3} justifyContent={'center'}>
        <Grid sx={12} sm={6}>
          <UploadReportsCard
            formik={formik}
            onSave={handleSave}
          />
        </Grid>
        <Grid sx={12} sm={6} >
          <ShowReportsCard
            resourceData={listData}
            isOpen={isDeleteDialogOpen}
            entityName={'Monthly Report'}
            cardTitle={'Monthly Reports'}
            primaryText={monthlyReport?.label}
            handleClose={handleDeleteDialogClose}
            handleDelete={handleDelete}
            handleDeleteConfirm={handleDeleteDialogConfirm}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default MonthlyReportsPage2;