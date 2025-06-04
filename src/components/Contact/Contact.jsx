import React from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress, ListItem, List, Link } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const Contact = () => {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    onSubmit: async (values) => {
      try {
        await nchandiWebsiteService.emailContactForm({}, values);
        formik.handleReset();
        enqueueSnackbar('Your request was successfully submitted.', snackbarMessages.success.configuration);
      } catch (err) {
        enqueueSnackbar('There was an error when submitting this form, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  /**
   *
   */
  const handleSubmit = () => {
    formik.submitForm();
    if (!formik.isValid) {
      enqueueSnackbar('There are fields missing in your form. Please fill out all the required fields.', snackbarMessages.error.configuration);
    }
    formik.setSubmitting(false);
  };

    return (
        <Box pl={4} pr={4} pb={7}>
          <Box textAlign={'center'} py={5} pb={3}>
            <Typography variant="h3" color={'white'} pb={5} pl={3} pr={3} >
              We'd love to hear from you!
            </Typography>
          </Box>
          <Paper variant='elevation' elevation={5}>
            <Grid container spacing={1} direction={{ sm: 'column-reverse' , md: 'row'  }}>
              <Grid container sm={10} md={7} direction={'column'}>
                <Box pb={7} py={7} ml={4} mr={4}>
                  <TextField
                  label='First Name'
                  name='firstName'
                  fullWidth
                  variant='outlined'
                  margin='dense'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.firstName ? formik.errors.firstName : ""}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  required
                  />
                  <TextField
                    label='Last Name'
                    name='lastName'
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.lastName ? formik.errors.lastName : ""}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    required
                  />
                  <TextField
                    label='Email'
                    name='email'
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.email ? formik.errors.email : ""}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    required
                  />
                  <TextField
                    label='Phone'
                    name='phone'
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.phone ? formik.errors.phone : ""}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    required
                  />
                  <TextField
                    label='Message'
                    name='message'
                    fullWidth
                    multiline
                    minRows={7}
                    variant='outlined'
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 200
                      },
                      alignItems:"flex-start"
                    }}
                    margin='dense'
                    size='large'
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.message ? formik.errors.message : ""}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    required
                  />
                  <Box textAlign={'center'} py={1}>
                    <Button
                      data-cy='nchandi-contact-confirm-btn'
                      color='secondary'
                      variant='contained'
                      sx={{ width: 200, padding: 1, margin: 2 }}
                      size='large'
                      onClick={handleSubmit}
                      disabled={formik.isSubmitting}
                    >
                      Submit {formik.isSubmitting &&
                        <Box ml={1} mt={1}><CircularProgress size={15} /></Box>
                      }
                    </Button>
                  </Box>
                </Box >
              </Grid>
              <Grid sm={10} md={4} >
                <Box alignItems={'center'} justifyContent={'center'} py={2} pl={5} pr={5} >
                  <Typography variant='h4' color={nchandiTheme.handiDarkGreen} sx={{ fontWeight: 'bold' }} textAlign={'center'} pb={5}>
                    Contact Form
                  </Typography>
                  <Typography variant='h5' color={nchandiTheme.handiDarkGreen} pb={3}>
                    Please use this form to contact us. You can also contact our committee board members directly:
                  </Typography>
                  <List sx={{ listStyleType: 'disc' }}>
                    <ListItem sx={{ display: 'list-item', color: nchandiTheme.handiDarkYellow }}>
                      <Link underline='hover'>
                        <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>facilities@nchandi.org</Typography>
                      </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', color: nchandiTheme.handiDarkYellow }}>
                      <Link underline='hover'>
                        <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>literature@nchandi.org</Typography>
                      </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', color: nchandiTheme.handiDarkYellow }}>
                      <Link underline='hover'>
                        <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>treasurer@nchandi.org</Typography>
                      </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', color: nchandiTheme.handiDarkYellow }}>
                      <Link underline='hover'>
                        <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>spanish@nchandi.org</Typography>
                      </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', color: nchandiTheme.handiDarkYellow }}>
                      <Link underline='hover'>
                        <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>secretary@nchandi.org</Typography>
                      </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', color: nchandiTheme.handiDarkYellow }}>
                      <Link underline='hover'>
                        <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>technology@nchandi.org</Typography>
                      </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'list-item', color: nchandiTheme.handiDarkYellow }}>
                      <Link underline='hover' >
                        <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>chairperson@nchandi.org</Typography>
                      </Link>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
    )
}

export default Contact;