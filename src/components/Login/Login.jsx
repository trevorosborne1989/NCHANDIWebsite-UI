import React from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {Buffer} from 'buffer';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import Cookies from 'js-cookie';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameParameter: '',
      passwordParameter: ''
    },
    onSubmit: async (values) => {
      const { usernameParameter } = values;
      const { passwordParameter } = values;
      // const token = Buffer.from(`${usernameParameter}:${passwordParameter}`, 'utf8').toString('base64')
      try {
        // const { data: authorities } = await nchandiWebsiteService.authenticate(token);
        // if (authorities[0]?.authority.length > 5) {
          // Cookies.set('isAdmin', true); // use get cookie to get this value at the top level of a component to set a piece of state like tempCookie for a rendering conditional.
          Cookies.set('tempCookie', true);
        // }
        // console.log(authorities[0]?.authority);
        enqueueSnackbar('Login successful.', snackbarMessages.success.configuration);
        history('/admin-container');
        // window.location.reload();
      } catch (err) {
        enqueueSnackbar('Invalid username or password.', snackbarMessages.error.configuration);
        formik.resetForm();
        console.error(err);
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
    formik.setSubmitting(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter")
      handleSave();
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
                  <Grid sm={10}>
                    <Box py={7} pb={3}>
                      <Typography variant="h6" color={'white'} >
                        Email Address
                      </Typography>
                      <TextField
                        label='Email'
                        name='usernameParameter'
                        color='primary'
                        sx={{ backgroundColor: 'white' }}
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
                  <Grid sm={10}>
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
                      >
                        Submit {formik.isSubmitting &&
                          <Box ml={1} mt={1}><CircularProgress size={15} /></Box>
                        }
                      </Button>
                    </Grid>
                    <Grid sm={12}>
                      <Typography variant="h7" color={'white'}>
                        Login is for chairmembers and other appointees.
                      </Typography>
                    </Grid>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    )
}

export default Login;