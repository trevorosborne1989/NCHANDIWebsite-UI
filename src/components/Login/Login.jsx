import React from 'react';
import { Box, Container, Paper, TextField, Typography, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import { nchandiTheme } from '../../App';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
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
        enqueueSnackbar('There was an error signing in', snackbarMessages.error.configuration);
      }
      console.log(formik.values);
      alert(JSON.stringify(formik.values));
    }
  });

  // const { setValues, submitForm, handleReset, handleBlur, handleChange } = formik;

  const handleSubmit = (values) => {
    formik.submitForm(values)
    formik.handleReset()
  };

    return (
      <Container>
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
                      name='username'
                      color='primary'
                      sx={{ backgroundColor: 'white' }}
                      fullWidth
                      variant='filled'
                      margin='dense'
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
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
                    name='password'
                    color='primary'
                    sx={{ backgroundColor: 'white' }}
                    fullWidth
                    variant='filled'
                    margin='dense'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                      onClick={handleSubmit}
                      disabled={formik.isSubmitting}
                    >
                      Submit {formik.isSubmitting &&
                        <Box ml={1} mt={1}><CircularProgress size={15} /></Box>
                      }
                    </Button>
                  </Grid>
                  <Grid sm={12}>
                    <Typography variant="h7" color={'white'}>
                      No account yet? Create an account
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
}

export default Login;