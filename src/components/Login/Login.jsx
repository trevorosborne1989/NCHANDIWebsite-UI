import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Link
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LoginForgetPasswordDialog from "../LoginForgetPasswordDialog/LoginForgetPasswordDialog";
import {Buffer} from 'buffer';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import Cookies from 'js-cookie';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const Login = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameParameter: '',
      passwordParameter: '',
      forgotPassword: false,
      email: ''
    },
    onSubmit: async (values) => {
      const { usernameParameter } = values;
      const { passwordParameter } = values;
      const { email } = values;
      if (email) {
        try {
          formik.setSubmitting(true);
          await nchandiWebsiteService.resetPassword({}, email);
          setDialogOpen(false);
          enqueueSnackbar('If you are a committee member and your email exists, a message will be sent with password instructions.', snackbarMessages.success.configuration);
        } catch (err) {
          enqueueSnackbar('There was an error when submitting your password request, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
          console.error(err);
        } finally {
          formik.resetForm();
        }
      } else {
        const token = Buffer.from(`${usernameParameter}:${passwordParameter}`, 'utf8').toString('base64')
        try {
          const { data: authorities } = await nchandiWebsiteService.authenticate(token);
          if (authorities[0]?.authority.length > 5) {
            Cookies.set('isAdmin', true); // use get cookie to get this value at the top level of a component to set a piece of state like tempCookie for a rendering conditional.
          } else {
            throw new Error("This login is not an Admin.");
          }
          console.log(authorities[0]?.authority);
          enqueueSnackbar('Login successful.', snackbarMessages.success.configuration);
          history('/admin-container');
          // window.location.reload();
        } catch (err) {
          enqueueSnackbar('Invalid username or password.', snackbarMessages.error.configuration);
          formik.resetForm();
          console.error(err);
        }
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  const handleSave = () => {
    formik.submitForm()
    if (!formik.isValid) {
      enqueueSnackbar('There are fields missing or invalid in your form. Please fill out all the required fields.', snackbarMessages.error.configuration);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter")
      handleSave();
  };

  const handleDialogSave = (e) => {
    formik.setFieldValue('forgotPassword', true);
    formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('The email field is missing. Please fill out this required field.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
  };

  const handleDialogClose = () => {
    formik.setFieldValue('forgotPassword', false);
    setDialogOpen(false);
  };

    return (
      <Container>
        <div onKeyDown={handleKeyPress}>
          <Box textAlign={'center'} py={5} pb={3}>
            <Typography variant="h3" color={'white'} pb={10} pl={3} pr={3} >
              Admin Login
            </Typography>
          </Box>
          <Grid container spacing={1} pb={7} alignContent={'center'} justifyContent={'center'}>
            <Grid sm={8}>
              <Paper variant='elevation' elevation={15} sx={{ backgroundColor: nchandiTheme.handiDarkGreen }} >
                <Grid container alignContent={'center'} justifyContent={'center'} direction={'column'} >
                  <Grid sm={10}  ml={3} mr={3}>
                    <Box py={7} pb={3}>
                      <Typography variant="h6" color={'white'} >
                        Email Address
                      </Typography>
                      <TextField
                        label='Email'
                        name='usernameParameter'
                        color='primary'
                        sx={{ backgroundColor: 'white'}}
                        fullWidth
                        type='email'
                        variant='filled'
                        margin='dense'
                        value={formik.values.usernameParameter}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.usernameParameter ? formik.errors.usernameParameter : ""}
                        error={formik.touched.usernameParameter && Boolean(formik.errors.usernameParameter)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid sm={10} ml={3} mr={3}>
                    <Typography variant="h6" color={'white'}>
                      Password
                    </Typography>
                    <TextField
                      label='Password'
                      name='passwordParameter'
                      color='primary'
                      sx={{ backgroundColor: 'white' }}
                      fullWidth
                      type='password'
                      variant='filled'
                      margin='dense'
                      value={formik.values.passwordParameter}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.passwordParameter ? formik.errors.passwordParameter : ""}
                      error={formik.touched.passwordParameter && Boolean(formik.errors.passwordParameter)}
                      required
                    />
                  </Grid>
                  <Box py={3} textAlign={'center'}>
                    <Grid sm={12}>
                      <Button
                        data-cy='nchandi-contact-confirm-btn'
                        color='primary'
                        variant='contained'
                        sx={{ width: 300, padding: 1, margin: 2 }}
                        size='large'
                        onClick={handleSave}
                        disabled={formik.isSubmitting}
                        startIcon={formik.isSubmitting &&
                          <CircularProgress size={30} color='warning' />
                        }
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid sm={12} ml={2} mr={2}>
                      <Typography variant="h7" color={'white'}>
                        Login is for chairmembers and other appointees.
                      </Typography>
                    </Grid>
                    <Grid sm={12} ml={2} mr={2}>
                      <Link component='button' variant={'h6'} underline='hover' color={nchandiTheme.handiDarkYellow}
                        onClick={() => {
                          setDialogOpen(true);
                          formik.setFieldValue('forgotPassword', true);
                        }}
                      >
                        Forgot Password, or new appointee?
                      </Link>
                    </Grid>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <LoginForgetPasswordDialog
          formik={formik}
          isOpen={dialogOpen}
          handleSave={handleDialogSave}
          handleClose={handleDialogClose}
        />
      </Container>
    )
}

export default Login;