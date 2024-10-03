import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Skeleton } from '@mui/material';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { yupSchema } from './ValidationSchema';
import UploadReportsCard from '../UploadReportsCard/UploadReportsCard';
import ReportsListCard from '../ReportsListCard/ReportsListCard';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const MonthlyReportsPage = () => {
  const [listData, setListData] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: '',
      isFinancial: false,
      isMinutes: false,
      type: '',
      monthOfYear: '',
      file: ''
    },
    onSubmit: async (values) => {
      let file = new FormData();
      file.append("content", values.file);
      delete values.file;
      try {
        setLoading(true);
        const resourceItemData = await nchandiWebsiteService.postResourceItem({}, values);
        await nchandiWebsiteService.postAttachments({}, resourceItemData.data.id, file);
        formik.handleReset();
        enqueueSnackbar('This resource was successfully uploaded.', snackbarMessages.success.configuration);
      } catch (err) {
        enqueueSnackbar('There was an error when uploading this resource, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      } finally {
        fetchListData();
        setLoading(false);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  /**
   *
   */
  const fetchListData = useCallback(async () => {
    try {
      setLoading(true);
      const monthlyReports = (await nchandiWebsiteService.getResourceItems()).data.filter(resourceItem => (resourceItem?.type === 'Financial' || resourceItem?.type === 'Minutes'));
      setListData(monthlyReports);
    } catch (err) {
      enqueueSnackbar('Unable to fetch current monthly reports, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
      console.error(err);
    } finally {
      setLoading(false);
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
  const handleClick = async (e, entity) => {
    e.stopPropagation();
    setMonthlyReport(entity);
    setLoading(true);
    try {
      let response = await nchandiWebsiteService.getAttachmentWithAttachmentId({}, entity.id);
      window.open(URL.createObjectURL(response.data))
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error retrieving the attachment!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
    }
  }

  /**
   *
   */
  const handleSave = () => {
    if (formik.values.isFinancial) {
      formik.setFieldValue('type', 'Financial');
    } else if (formik.values.isMinutes) {
      formik.setFieldValue('type', 'Minutes');
    }
    if (!formik.values.file) {
      enqueueSnackbar('A file is required.', snackbarMessages.error.configuration)
    } else {
      formik.submitForm();
    }
    if (formik.values.file && formik.errors?.file) {
      enqueueSnackbar(formik.errors?.file, snackbarMessages.error.configuration);
    };
    if (formik.errors?.checkboxValidation) {
      enqueueSnackbar(formik.errors?.checkboxValidation, snackbarMessages.error.configuration);
    };
    formik.setSubmitting(false);
  }

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
    setLoading(true);
    try {
      const { id } = monthlyReport;
      await nchandiWebsiteService.deleteResourceItemWithResourceItemId({}, id);
      enqueueSnackbar('This resource was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting this resource!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setMonthlyReport(null);
      setIsDeleteDialogOpen(false);
      fetchListData();
    }
  };

  return (
    <>
      <Grid container sm={12} spacing={3} justifyContent={'center'}>
        <Grid sx={12} sm={6}>
          <UploadReportsCard
            formik={formik}
            onSave={handleSave}
          />
        </Grid>
        {loading ?
          <Skeleton variant='rectangular' width='100%'/>
          :
          <Grid sx={12} sm={6} >
            <ReportsListCard
              resourceData={listData}
              handleClick={handleClick}
              isOpen={isDeleteDialogOpen}
              selectedEntity={monthlyReport}
              entityName={'Monthly Report'}
              cardTitle={'Monthly Reports'}
              primaryText={monthlyReport?.monthOfYear}
              secondaryText={monthlyReport?.type}
              handleClose={handleDeleteDialogClose}
              handleDelete={handleDelete}
              handleDeleteConfirm={handleDeleteDialogConfirm}
            />
          </Grid>
          }
      </Grid>
    </>
  )
}

export default MonthlyReportsPage;