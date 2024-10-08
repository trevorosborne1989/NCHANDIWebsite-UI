import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Skeleton } from '@mui/material';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { yupSchema } from './ValidationSchema';
import UploadCard from '../UploadCard/UploadCard';
import ListCard from '../ListCard/ListCard';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const GeneralResourcesPage = () => {
  const [listData, setListData] = useState([]);
  const [generalResource, setGeneralResource] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
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
      const generalResurces = (await nchandiWebsiteService.getResourceItems()).data.filter(resourceItem => resourceItem?.type === 'General Resource');
      setListData(generalResurces);
    } catch (err) {
      enqueueSnackbar('Unable to fetch current general resources, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
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
    setGeneralResource(entity);
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
    formik.setFieldValue('type', 'General Resource');
    if (!formik.values.file) {
      enqueueSnackbar('A file is required.', snackbarMessages.error.configuration)
    } else {
      formik.submitForm();
    }
    if (formik.values.file && formik.errors?.file) {
      enqueueSnackbar(formik.errors?.file, snackbarMessages.error.configuration);
    };
    formik.setSubmitting(false);
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
    setLoading(true);
    try {
      const { id } = generalResource;
      await nchandiWebsiteService.deleteResourceItemWithResourceItemId({}, id);
      enqueueSnackbar('This resource was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting this resource!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setGeneralResource(null);
      setIsDeleteDialogOpen(false);
      fetchListData();
    }
  };

  return (
    <>
      <Grid container sm={12} spacing={3} justifyContent={'center'}>
        <Grid sx={12} sm={6}>
          <UploadCard
            formik={formik}
            onSave={handleSave}
          />
        </Grid>
        {loading ?
          <Skeleton variant='rectangular' width='90%' height={250}/>
          :
          <Grid sx={12} sm={6} >
            <ListCard
              resourceData={listData}
              handleClick={handleClick}
              isOpen={isDeleteDialogOpen}
              selectedEntity={generalResource}
              entityName={'General Resource'}
              cardTitle={'General Resources'}
              primaryText={generalResource?.name}
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

export default GeneralResourcesPage;