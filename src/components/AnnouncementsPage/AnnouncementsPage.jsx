import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { yupSchema } from './ValidationSchema';
import {
  Typography,
  Card,
  Box,
  Skeleton,
  Link,
  IconButton,
  Tooltip,
} from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import ListCard from '../ListCard/ListCard';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'
import UploadCard from '../UploadCard/UploadCard';
import { nchandiTheme } from '../../App';

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
      addUrl: false,
      urlTitle: '',
      url: '',
      file: ''
    },
    onSubmit: async (values) => {
      let file = new FormData();
      let hasFile = false
      if (values.file) {
        hasFile = true;
      }
      file.append("content", values.file);
      delete values.file;
      try {
        setLoading(true);
        const resourceItemData = await nchandiWebsiteService.postResourceItem({}, values);
        if (hasFile) {
          await nchandiWebsiteService.postAttachments({}, resourceItemData.data.id, file);
        }
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
      const announcements = (await nchandiWebsiteService.getResourceItems()).data.filter(resourceItem => resourceItem?.type === 'Announcement' || resourceItem?.type === 'Announcement With Attachment');
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
  const handleClick = async (e, entity) => {
    e.stopPropagation();
    setAnnouncement(entity);
  }

  /**
   *
   */
  const handleClickAttachment = async (e, entity) => {
    e.stopPropagation();
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
    if (formik.values.file){
      formik.setFieldValue('type', 'Announcement With Attachment');
    } else ( formik.setFieldValue('type', 'Announcement'));
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
        <Grid sx={12} sm={6}>
          <UploadCard
            formik={formik}
            onSave={handleSave}
            announcment
          />
        </Grid>
        <Grid container spacing={3} sx={12} sm={6} direction={'column'} alignItems={'center'}>
          <Grid sx={12} sm={10}>
            {loading ?
              <Skeleton variant='rectangular' width='90%' height={250}/>
              :
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
            }
          </Grid>
          {announcement &&
            <Grid sx={12} sm={12}>
              <Box align='center' alignItems='center' mb={8}s>
                <Card variant="elevation" elevation={10} sx={{ maxWidth: '90%', backgroundColor: "#f8d77f" }}>
                  <Typography variant="h4" py={2} mb={1.5}>
                    {announcement?.name}
                  </Typography>
                  <Typography variant='h6' mb={1}>
                    Date Posted: {announcement.createdDate}
                  </Typography>
                </Card>
                <Card variant="elevation" elevation={5} sx={{ maxWidth: '80%' }}>
                  <Typography variant='h6' marginTop={5} py={2} mb={4}>
                    {announcement?.body}
                  </Typography>
                  {announcement?.url &&
                    <Box alignItems={'center'} mb={2}>
                      <Card variant="elevation" elevation={10} sx={{ maxWidth: '90%', backgroundColor: "#f8d77f" }}>
                        <Box pb={1} pt={1}>
                          <Link variant={'h5'} underline='always' href={announcement.url} target="_blank" >
                            {announcement?.urlTitle}
                          </Link>
                        </Box>
                      </Card>
                    </Box>
                  }
                  {announcement?.type === "Announcement With Attachment" &&
                    <Box alignItems={'center'} mb={2}>
                      <Card variant="elevation" elevation={10} sx={{ maxWidth: '30%', backgroundColor: "#f8d77f" }}>
                        <Tooltip title="See Attachment">
                          <IconButton>
                            <AttachFile
                              fontSize='large'
                              color={'info'}
                              onClick={e => handleClickAttachment(e, announcement)}
                              sx={{"&:hover": { color: nchandiTheme.handiDarkYellow }, fontSize: '200%'}}
                            />
                          </IconButton>
                        </Tooltip>
                      </Card>
                    </Box>
                  }
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
