import React from 'react';
import {
  Typography,
  Divider,
  Paper,
  Box,
  TextField,
  Button,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Checkbox, } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import { nchandiTheme } from '../../App';

const Resources = () => {

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      commitments: '',
      facility: '',
      email: '',
      phonenumber: '',
      comments: '',
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
        enqueueSnackbar('There was an error submitting contact info', snackbarMessages.error.configuration);
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
      <Grid container>
        <Grid container sm={12} textAlign={'center'} justifyContent={'center'} py={3} pb={7}>
          <Grid sm={10}>
            <Typography variant="h3" color={'white'} >
              Resources
            </Typography>
          </Grid>
        </Grid>
        <Grid container sm={12} justifyContent={'center'} pb={7}>
          <Grid sm={10}>
            <Divider sx={{background: 'white'}} />
          </Grid>
        </Grid>
        <Grid container spacing={1} textAlign={'center'} justifyContent={'center'} pb={7} >
          <Grid container sm={10} md={3} direction='column' textAlign={'center'} alignItems={'center'} pb={7}>
            <Grid sm={10} pb={5}>
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }}>
                Panel Materials
              </Typography>
            </Grid>
            <Grid sm={10} pb={3}>
              <Typography variant='h5' color='white' textAlign={'left'}>
              Panel materials include any information relevant to H&I panels. Please click on links
              below for PDF files for each piece of information.
              </Typography>
            </Grid>
            {Array.from(Array(6)).map((_, index) => (
            <Grid sm={10} pb={3}>
              <Typography variant='h5' color='white' key={index}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
            </Grid>
            ))}
          </Grid>
          <Grid container sm={10} md={4} direction='column' textAlign={'center'} alignItems={'center'} pb={7} >
            <Grid sm={10} pb={5}>
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }}>
                General Resources
              </Typography>
            </Grid>
            <Grid sm={10} pb={3}>
              <Typography variant='h5' color='white' textAlign={'left'}>
                General resources include information miscellaneous information which you may find helpful.
                Please click on links below for PDF files for each piece of information.
              </Typography>
            </Grid>
            {Array.from(Array(6)).map((_, index) => (
            <Grid sm={10} pb={3}>
              <Typography variant='h5' color='white' key={index}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
            </Grid>
            ))}
          </Grid>
          <Grid container sm={10} md={4} direction='column' textAlign={'center'} alignItems={'center'} pb={7}>
            <Grid sm={10} pb={7}>
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }}>
                North County H&I Monthly Reports
              </Typography>
            </Grid>
            <Grid sm={10} pb={3}>
              <Typography variant='h5' color='white' textAlign={'left'}>
                The links below are for each months (in the current year) committee minutes and financial reports.
                Committee minutes are approved at the following months committee meeting, and financial reports
                are generally made available a few weeks after a committee meeting.
              </Typography>
            </Grid>
            <Grid container xs={12} rowSpacing={1} direction='row' justifyContent={'center'} textAlign={'center'}>
              {Array.from(Array(12)).map((_, index) => (
              <Grid sm={10} md={4} key={index} pb={5}>
                <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }} >
                  January
                </Typography>
                <Typography variant='h6' color='white'  >
                  Financial Report
                </Typography>
                <Typography variant='h6' color='white'  >
                  Committee Minutes
                </Typography>
              </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container sm={12} justifyContent={'center'} pb={7}>
          <Grid sm={10}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container sm={12} justifyContent={'center'} textAlign={'center'} pb={7}>
          <Grid container sm={10} md={5} alignItems={'center'} direction={'column'} >
            <Grid sm={10} pb={5}>
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }}>
                Useful Links
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h5' color='white' textAlign={'left'}>
                Find links here for various things related to Alcoholics Anonymous, such as
                site with databases of speaker tapes or the websites for our local central
                offices
              </Typography>
            </Grid>
            <Grid sm={10}>
              <Typography variant='h5' color='white'>
                Recovery Speakers
              </Typography>
            </Grid>
            <Grid sm={10}>
              <Typography variant='h5' color='white'>
                NC Central Office
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h5' color='white'>
                San Diego Central Office
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }}>
                Archived Records
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h5' color='white' textAlign={'left'}>
                The previous years financial summary can be viewed by clicking on the link below.
                This is the December report for last year.
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h5' color='white'>
                Previous Year Financial Summary
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h5' color='white' textAlign={'left'}>
                Archived reports contain important information from past years and can be a helpful
                place to look for older documents relevant to H&I.
              </Typography>
            </Grid>
            <Grid sm={10}>
              <Typography variant='h5' color='white'>
                2021 Board Approved Budget
              </Typography>
            </Grid>
            <Grid sm={10}>
              <Typography variant='h5' color='white' pb={7}>
                2022 Proposed Budget
              </Typography>
            </Grid>
          </Grid>
          <Grid container sm={10} md={5} alignItems={'center'} direction={'column'}>
            <Grid sm={10} pb={5}>
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }}>
                Viewpoint
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h5' color='white' textAlign={'left'}>
                The Viewpoint is the North San Diego County A.A. monthly newsletter. It is a publication of the
                North San Diego County Intergroup of A.A. and is distributed by the North County Central Office.
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h5' color='white'  >
                Most Recent Viewpoint
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }}>
                Contact on Release
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h5' color='white' textAlign={'left'}>
                The primary purpose of AA Contact on Release is to introduce newly released members to AA on the outside.
                Being alcoholics ourselves, we know that the people you will meet in your first days out could make all
                the difference.
              </Typography>
            </Grid>
            <Grid sm={10} pb={5}>
              <Typography variant='h5' color='white' textAlign={'left'}>
                Many of us who have made the transition to sober and happy lives on the outside still remember the first days
                on our own. It was hard to know what to do. Now, we see that we can help the new people getting out.
              </Typography>
            </Grid>
              <Grid sm={10} pb={5} textAlign={'left'}>
              <Typography variant='h5' color='white'  >
                We hope that we will hear from you. If you are interested in an AA contact upon your release, fill out and mail this
                form to our PO Box address listed in the form. A member of AA will be in touch with you. Please note: AA Contact on
                Release does not provide rides from the facility.
              </Typography>
            </Grid>
            <Grid sm={10}>
              <Typography variant='h5' color='white'  >
                Contact on Release Form
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sm={12} justifyContent={'center'} pb={7}>
          <Grid sm={10}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container justifyContent={'center'} alignItems={'center'} pb={7}>
          <Grid container sm={10} justifyContent={'center'} alignItems={'center'}>
            <Paper variant='elevation' elevation={15} >
              <Grid container sm={12} direction={'column'} justifyContent={'center'} alignItems={'center'} py={3}>
                <Grid sm={10} pb={5} textAlign={'center'}>
                  <Typography variant='h4' sx={{ fontWeight: 'bold' }} color={nchandiTheme.handiDarkGreen}>
                    Literature Request Form
                  </Typography>
                </Grid>
                <Grid sm={10} pb={5}>
                  <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>
                  Thank you for your service bringing the message of AA to those who cannot get to a meeting. To order literature for
                  the facility you are a panel member of, please complete the form below. Once we receive your order, we will contact
                  you with delivery and/or pick-up information.
                  </Typography>
                </Grid>
                <Grid sm={10}>
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
                </Grid>
                <Grid sm={10} pb={5}>
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
                </Grid>
                <Grid sm={10} pb={5}>
                  <TextField
                    label='H&I Commitment'
                    name='commitment'
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    value={formik.values.commitment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                </Grid>
                <Grid sm={10} pb={5}>
                  <TextField
                    label='Facility'
                    name='facility'
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    value={formik.values.facility}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                </Grid>
                <Grid sm={10} pb={5}>
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
                </Grid>
                <Grid sm={10} pb={5}>
                  <TextField
                    label='Phone Number'
                    name='phoneNumber'
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                </Grid>
                <Grid sm={10} pb={2}>
                  <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>
                    Literature Request
                  </Typography>
                </Grid>
                <Grid sm={10} pb={5}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}/>}
                      label="Living Sober" sx={{ color: nchandiTheme.handiDarkBlue}}
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select"
                      defaultValue="EUR"
                      helperText="Please select your currency"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <FormControlLabel
                      control={<Checkbox sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}/>}
                      label="12 Steps and 12 Traditions" sx={{ color: nchandiTheme.handiDarkBlue}}
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}/>}
                      label="Alcoholic Anonymous paperback" sx={{ color: nchandiTheme.handiDarkBlue}}
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}/>}
                      label="Alcoholic Anonymous pocket size" sx={{ color: nchandiTheme.handiDarkBlue}}
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}/>}
                      label="Grapevines" sx={{ color: nchandiTheme.handiDarkBlue}}
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}/>}
                      label="La Vina" sx={{ color: nchandiTheme.handiDarkBlue}}
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}/>}
                      label="Newcomer Packets" sx={{ color: nchandiTheme.handiDarkBlue}}
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}/>}
                      label="Literature Rack w/ Pamphlets" sx={{ color: nchandiTheme.handiDarkBlue}}
                    />
                    <FormControlLabel
                      control={<Checkbox sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}/>}
                      label="Other" sx={{ color: nchandiTheme.handiDarkBlue}}
                    />
                  </FormGroup>
                </Grid>
                <Grid sm={10} pb={5}>
                  <TextField
                    label='Special Instructions / Comments'
                    name='comments'
                    fullWidth
                    multiline
                    minRows={7}
                    size='large'
                    variant='outlined'
                    sx={{
                      "& .MuiInputBase-root": {
                        height: 200
                      },
                      alignItems:"flex-start"
                    }}
                    margin='dense'
                    value={formik.values.comments}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                </Grid>
                <Grid sm={10} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                  <Button
                    data-cy='nchandi-literature-request-confirm-btn'
                    color='secondary'
                    variant='contained'
                    sx={{ width: '50%', padding: 1, margin: 2 }}
                    size='large'
                    onClick={handleSubmit}
                    disabled={formik.isSubmitting}
                  >
                    Submit {formik.isSubmitting &&
                      <Box ml={1} mt={1}><CircularProgress size={15} /></Box>
                    }
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
  )
}

export default Resources;