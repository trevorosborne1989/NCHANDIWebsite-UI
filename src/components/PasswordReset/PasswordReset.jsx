import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Skeleton,
  Card,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const PasswordReset = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState('');

  const formik = useFormik({
    initialValues: {
      NewPasswordParameter: '',
      ConfirmNewPasswordParameter: ''
    },
    onSubmit: async (values) => {
      const { NewPasswordParameter } = values;
      const { id } = person;
      person.password = NewPasswordParameter;
      try {
        await nchandiWebsiteService.putPersonWithPersonId({}, id, person);
        enqueueSnackbar('Password reset successful. Please login again', snackbarMessages.success.configuration);
        history('/login-page');
        // window.location.reload();
      } catch (err) {
        enqueueSnackbar('Error saving new password.', snackbarMessages.error.configuration);
        formik.resetForm();
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  /**
   *
   */
  useEffect(() => {
    const fetchToken = async (decodedToken) => {
      try {
        setLoading(true);
        const { data: resetToken } = await nchandiWebsiteService.getPasswordResetTokenByToken({}, decodedToken);
        const { data: passwordResetPerson } = await nchandiWebsiteService.getPersonWithPersonId({}, resetToken[0]?.personId);
        setPerson(passwordResetPerson);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    // 1. Get query string from URL (e.g., "?token=xyz123")
    const params = new URLSearchParams(location.search);
    const encodedToken = params.get('token');
    let decodedToken = '';
    if (encodedToken) {
      // 2. Decode the token if it was encoded
      decodedToken = decodeURIComponent(encodedToken);
      fetchToken(decodedToken);
    }
  }, [location]);

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
        {loading ?
          <Skeleton variant='rectangular' width='90%' height={250}/>
          :
          <>
            {person ?
              <div onKeyDown={handleKeyPress}>
                <Box textAlign={'center'} py={5} pb={3}>
                  <Typography variant="h3" color={'white'} pb={10} pl={3} pr={3} >
                    Password Reset
                  </Typography>
                </Box>
                <Grid container spacing={1} pb={7} alignContent={'center'} justifyContent={'center'}>
                  <Grid sm={8}>
                    <Paper variant='elevation' elevation={15} sx={{ backgroundColor: nchandiTheme.handiDarkGreen }} >
                      <Grid container alignContent={'center'} justifyContent={'center'} direction={'column'} >
                        <Grid sm={10} ml={3} mr={3} mb={1}>
                          <Typography variant="h6" color={'white'}>
                            New Password
                          </Typography>
                          <TextField
                            label='New Password'
                            name='NewPasswordParameter'
                            color='primary'
                            sx={{ backgroundColor: 'white' }}
                            fullWidth
                            type='password'
                            variant='filled'
                            margin='dense'
                            value={formik.values.NewPasswordParameter}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.NewPasswordParameter ? formik.errors.NewPasswordParameter : ""}
                            error={formik.touched.NewPasswordParameter && Boolean(formik.errors.NewPasswordParameter)}
                            required
                          />
                        </Grid>
                        <Grid sm={10} ml={3} mr={3} mb={1}>
                          <Typography variant="h6" color={'white'}>
                            Confirm New Password
                          </Typography>
                          <TextField
                            label='Confirm New Password'
                            name='ConfirmNewPasswordParameter'
                            color='primary'
                            sx={{ backgroundColor: 'white' }}
                            fullWidth
                            type='password'
                            variant='filled'
                            margin='dense'
                            value={formik.values.ConfirmNewPasswordParameter}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.ConfirmNewPasswordParameter ? formik.errors.ConfirmNewPasswordParameter : ""}
                            error={formik.touched.ConfirmNewPasswordParameter && Boolean(formik.errors.ConfirmNewPasswordParameter)}
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
                        </Box>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
              :
              <Card variant='elevation' elevation={15} sx={{ backgroundColor: nchandiTheme.handiDarkYellow }} >
                <Box pt={40} pb={40} pl={10} pr={10}>
                  <Typography variant="h4" color={'white'} textAlign={'center'} >
                    Your password reset link is invalid. Please contact the nchandi Technology Chair for further assistance.
                  </Typography>
                </Box>
              </Card>
            }
          </>
        }
      </Container>
    )
}

export default PasswordReset;