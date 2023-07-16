import React from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import { nchandiTheme } from '../../App';

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
    onSubmit: async values => {
      try {
        const { id } = values;
        if (id) {
          // await ectsService.putEctsstaffWithEctsStaffId({}, id, values);
          // setDialogOpen(false);
          console.log('Calling PUT service mthod')
        }
        else {
          // await ectsService.postEctsstaff({}, values);
          // setDialogOpen(false);
          console.log('Calling POST service mthod')
        }
      } catch (e) {
        console.error(e);
        enqueueSnackbar('There was an error submitting/updating ECP Staff', snackbarMessages.error.configuration);
      }
      console.log(formik.values);
      alert(JSON.stringify(formik.values));
    }
  });

  const { setValues, submitForm, handleReset, handleBlur, handleChange } = formik;

  const handleSubmit = (values) => {
    formik.submitForm(values)
    formik.handleReset()
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
                <Box pb={7} pl={10} py={7}>
                  <TextField
                  label='First Name'
                  name='firstName'
                  fullWidth
                  variant='outlined'
                  margin='dense'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  <Typography variant='h5' color={nchandiTheme.handiDarkGreen} pb={5}>
                    Please use this form to contact us. You can also contact our committee board members directly.
                  </Typography>
                  <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>
                    For information about voluneering or a facility, contact
                  </Typography>
                  {/* Dropdown of emails */}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
    )
}

export default Contact;