import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { yupSchema } from './ValidationSchema';
import {
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  Skeleton
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { nchandiTheme } from '../../App';
import ListCard from '../ListCard/ListCard';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const AnnouncementsPage = () => {
  const [listData, setListData] = useState([]);
  const [announcement, setAnnouncement] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: '',
      body: '',
      type: '',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await nchandiWebsiteService.postResourceItem({}, values);
        enqueueSnackbar('This resource was successfully uploaded.', snackbarMessages.success.configuration);
        fetchListData();
      } catch (err) {
        enqueueSnackbar('There was an error when uploading this resource, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      } finally {
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
      const announcements = (await nchandiWebsiteService.getResourceItems()).data.filter(resourceItem => resourceItem?.type === 'Announcement');
      setListData(announcements);
    } catch (err) {
      enqueueSnackbar('Unable to fetch current announcements, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
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
  const handleClick = (e, entity) => {
    e.stopPropagation();
    setAnnouncement(entity);
  }

  /**
   *
   */
  const handleSave = () => {
    formik.setFieldValue('type', 'Announcement');
    formik.submitForm();
    if (!formik.isValid) {
      enqueueSnackbar('There are fields missing or invalid in your form. Please fill out all the required fields.', snackbarMessages.error.configuration);
    }
    formik.setSubmitting(false);
  };

  /**
   *
   */
  const handleDelete = (e, entity) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
    setAnnouncement(entity);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setAnnouncement(null);
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    setLoading(true);
    try {
      const { id } = announcement;
      await nchandiWebsiteService.deleteResourceItemWithResourceItemId({}, id);
      enqueueSnackbar('This resource was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting this resource!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setAnnouncement(null);
      setIsDeleteDialogOpen(false);
      fetchListData();
    }
  };

  return (
    <>
      <Grid container sm={12} justifyContent={'center'}>
        <Grid sx={12} sm={5}>
          <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue }} variant="elevation" elevation={10}>
            <CardContent>
              <Typography variant='h5' color={nchandiTheme.handiSecondaryWhite}>
                Header
              </Typography>
              <Box py={2} pb={3}>
                <TextField
                  name='name'
                  fullWidth
                  variant='filled'
                  size='small'
                  color='secondary'
                  focused
                  sx={{input: { color: nchandiTheme.handiSecondaryWhite }}}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.name ? formik.errors.name : ""}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  required
                />
                <Typography variant='h5' color={nchandiTheme.handiSecondaryWhite} py={3}>
                  Body
                </Typography>
                <TextField
                  name='body'
                  fullWidth
                  variant='filled'
                  size='medium'
                  color='secondary'
                  focused
                  multiline
                  rows={6}
                  sx={{input: { color: nchandiTheme.handiSecondaryWhite }}}
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.body ? formik.errors.body : ""}
                  error={formik.touched.body && Boolean(formik.errors.body)}
                  required
                />
              </Box>
              <Box display="flex" justifyContent="center">
                <LoadingButton
                  onClick={handleSave}
                  loading={loading}
                  disabled={loading}
                  size='large'
                  color='secondary'
                  >
                    SUBMIT
                </LoadingButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={3} sx={12} sm={7} direction={'column'} alignItems={'center'}>
          {loading ?
            <Skeleton variant='rectangular' width='100%'/>
            :
            <Grid sx={12} sm={10}>
              <ListCard
                resourceData={listData}
                handleClick={handleClick}
                isOpen={isDeleteDialogOpen}
                entityName={'Announcement'}
                cardTitle={'Announcements'}
                primaryText={announcement?.name}
                handleClose={handleDeleteDialogClose}
                handleDelete={handleDelete}
                handleDeleteConfirm={handleDeleteDialogConfirm}
              />
            </Grid>
          }
          {announcement &&
            <Grid sx={12} sm={12}>
              <Box align='center' alignItems='center' mb={8}s>
                <Card variant="elevation" elevation={10} sx={{ maxWidth: '90%', backgroundColor: "#f8d77f" }}>
                  <Typography variant="h4" py={2} mb={1.5}>
                    {announcement.name}
                  </Typography>
                  <Typography variant='h6' mb={1}>
                    Date Posted: {announcement.createdDate}
                  </Typography>
                </Card>
                <Card variant="elevation" elevation={5} sx={{ maxWidth: '80%' }}>
                  <Typography variant='h6' marginTop={5} py={2} mb={4}>
                    {announcement.body}
                  </Typography>
                </Card>
              </Box>
            </Grid>
          }
        </Grid>
      </Grid>
    </>
  )
}

export default AnnouncementsPage;
