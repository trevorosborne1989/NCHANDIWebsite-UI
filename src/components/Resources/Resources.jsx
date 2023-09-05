import React, { useState, useEffect } from 'react';
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
  Checkbox,
  MenuItem, } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import { nchandiTheme } from '../../App';
// import { NCHANDIWebsiteService } from '../../lib/NCHANDIWebsiteService';
import { yupSchema } from './ValidationSchema';

// const nchandiWebsiteService = new NCHANDIWebsiteService();
const facilityData = [
  {
    value: 'West Coast Recovery',
    label: 'West Coast Recovery',
  },
  {
    value: 'Tri-City',
    label: 'Tri-City',
  },
  {
    value: 'First Step House',
    label: 'First Step House',
  },
  {
    value: 'Crown View',
    label: 'Crown View',
  }
];
const commitmentOptions = [
  {
    value: 'Panel Leader',
    label: 'Panel Leader',
  },
  {
    value: 'Panel Coordinator',
    label: 'Panel Coordinator',
  },
  {
    value: 'Board Member',
    label: 'Board Member',
  }
];


const Resources = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [facilityOptions, setFaciltiyOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      commitment: '',
      facility: '',
      email: '',
      phoneNumber: '',
      livingSober: false,
      livingSoberQty: '',
      stepsAndTraditions12x12: false,
      stepsAndTraditions12x12Qty: '',
      aaPaperback: false,
      aaPaperbackQty: '',
      aaPocketSize: false,
      aaPocketSizeQty: '',
      grapevine: false,
      grapevineQty: '',
      laVina: false,
      laVinaQty: '',
      newcomerPackets: false,
      newcomerPacketsQty: '',
      literatureRackWithPamphlets: false,
      literatureRackWithPamphletsQty: '',
      other: false,
      otherQty: '',
      comments: ''
    },
    onSubmit: async () => {
      try {
        // await post method()   Use await here.
        enqueueSnackbar('This literature request was successfully submitted.', snackbarMessages.success.configuration);
        formik.handleReset();
      } catch (err) {
        enqueueSnackbar('There was an error when submitting this form, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  const validateSubmission = async () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all the required * fields.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
    }, 1000);
  };

  // const { setValues, submitForm, handleReset, handleBlur, handleChange } = formik;

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        // let response = await nchandiWebsiteService.getFacilites();
        // let facilityOptions = response.data.map(facilities => facilities || '');
        let facilityOptions = facilityData;
        setFaciltiyOptions(facilityOptions);
      } catch (error) {
        console.error(error);
        setFaciltiyOptions([]);
      }
    };
    fetchFacilities();
  }, []);

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
                    helperText={formik.touched.firstName ? formik.errors.firstName : ""}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
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
                    helperText={formik.touched.lastName ? formik.errors.lastName : ""}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    required
                  />
                </Grid>
                <Grid sm={10} pb={5}>
                  <TextField
                    select
                    label='H&I Commitment'
                    name='commitment'
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    value={formik.values.commitment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.commitment ? formik.errors.commitment : ""}
                    error={formik.touched.commitment && Boolean(formik.errors.commitment)}
                    required
                  >
                    {commitmentOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid sm={10} pb={5}>
                <TextField
                    select
                    label='Facility'
                    name='facility'
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    value={formik.values.facility}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.facility ? formik.errors.facility : ""}
                    error={formik.touched.facility && Boolean(formik.errors.facility)}
                    required
                  >
                    {facilityOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    helperText={formik.touched.email ? formik.errors.email : ""}
                    error={formik.touched.email && Boolean(formik.errors.email)}
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
                    helperText={formik.touched.phoneNumber ? formik.errors.phoneNumber : ""}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    required
                  />
                </Grid>
                <Grid sm={10} pb={2}>
                  <Typography variant='h5' color={nchandiTheme.handiDarkGreen}>
                    Literature Request
                  </Typography>
                </Grid>
                <Grid container direction='column' sm={12} pb={5}>
                  <Grid sm={4} ml={4}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox 
                          sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                          name='livingSober'
                          checked={formik.values.livingSober}
                          value={formik.values.livingSober}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          />}
                        label="Living Sober" sx={{ color: nchandiTheme.handiDarkBlue}}
                      />
                      {formik.values.livingSober &&
                      <TextField
                        label="*Living Sober Quantity"
                        sx={{ width: '60%' }}
                        variant='filled'
                        name='livingSoberQty'
                        value={formik.values.livingSoberQty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.livingSoberQty ? formik.errors.livingSoberQty : ""}
                        error={formik.touched.livingSoberQty && Boolean(formik.errors.livingSoberQty)}
                      />}
                      <FormControlLabel
                        control={<Checkbox
                          sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                          name='stepsAndTraditions12x12'
                          checked={formik.values.stepsAndTraditions12x12}
                          value={formik.values.stepsAndTraditions12x12}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          />}
                        label="12 Steps and 12 Traditions" sx={{ color: nchandiTheme.handiDarkBlue}}
                      />
                      {formik.values.stepsAndTraditions12x12 &&
                      <TextField
                        label="*12x12 Quantity"
                        sx={{ width: '60%' }}
                        variant='filled'
                        color='secondary'
                        name='stepsAndTraditions12x12Qty'
                        value={formik.values.stepsAndTraditions12x12Qty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.stepsAndTraditions12x12Qty ? formik.errors.stepsAndTraditions12x12Qty : ""}
                        error={formik.touched.stepsAndTraditions12x12Qty && Boolean(formik.errors.stepsAndTraditions12x12Qty)}
                      />}
                      <FormControlLabel
                        control={<Checkbox
                          sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                          name='aaPaperback'
                          checked={formik.values.aaPaperback}
                          value={formik.values.aaPaperback}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          />}
                        label="Alcoholic Anonymous paperback" sx={{ color: nchandiTheme.handiDarkBlue}}
                      />
                      {formik.values.aaPaperback &&
                      <TextField
                        label="*Paperback Quantity"
                        sx={{ width: '60%' }}
                        variant='filled'
                        color='secondary'
                        name='aaPaperbackQty'
                        value={formik.values.aaPaperbackQty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.aaPaperbackQty ? formik.errors.aaPaperbackQty : ""}
                        error={formik.touched.aaPaperbackQty && Boolean(formik.errors.aaPaperbackQty)}
                      />}
                      <FormControlLabel
                        control={<Checkbox
                          sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                          name='aaPocketSize'
                          checked={formik.values.aaPocketSize}
                          value={formik.values.aaPocketSize}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          />}
                        label="Alcoholic Anonymous pocket size" sx={{ color: nchandiTheme.handiDarkBlue}}
                      />
                      {formik.values.aaPocketSize &&
                      <TextField
                        label="*Pocket Size Quantity"
                        sx={{ width: '60%' }}
                        variant='filled'
                        color='secondary'
                        name='aaPocketSizeQty'
                        value={formik.values.aaPocketSizeQty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.aaPocketSizeQty ? formik.errors.aaPocketSizeQty : ""}
                        error={formik.touched.aaPocketSizeQty && Boolean(formik.errors.aaPocketSizeQty)}
                      />}
                      <FormControlLabel
                        control={<Checkbox
                          sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                          name='grapevine'
                          checked={formik.values.grapevine}
                          value={formik.values.grapevine}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          />}
                        label="Grapevines" sx={{ color: nchandiTheme.handiDarkBlue}}
                      />
                      {formik.values.grapevine &&
                      <TextField
                        label="*Grapevine Quantity"
                        sx={{ width: '60%' }}
                        variant='filled'
                        color='secondary'
                        name='grapevineQty'
                        value={formik.values.grapevineQty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.grapevineQty ? formik.errors.grapevineQty : ""}
                        error={formik.touched.grapevineQty && Boolean(formik.errors.grapevineQty)}
                      />}
                      <FormControlLabel
                        control={<Checkbox
                          sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                          name='laVina'
                          checked={formik.values.laVina}
                          value={formik.values.laVina}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          />}
                        label="La Vina" sx={{ color: nchandiTheme.handiDarkBlue}}
                      />
                      {formik.values.laVina &&
                      <TextField
                        label="*La Vina Quantity"
                        sx={{ width: '60%' }}
                        variant='filled'
                        color='secondary'
                        name='laVinaQty'
                        value={formik.values.laVinaQty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.laVinaQty ? formik.errors.laVinaQty : ""}
                        error={formik.touched.laVinaQty && Boolean(formik.errors.laVinaQty)}
                      />}
                      <FormControlLabel
                        control={<Checkbox
                          sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                          name='newcomerPackets'
                          checked={formik.values.newcomerPackets}
                          value={formik.values.newcomerPackets}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          />}
                        label="Newcomer Packets" sx={{ color: nchandiTheme.handiDarkBlue}}
                      />
                      {formik.values.newcomerPackets &&
                      <TextField
                        label="*Packets Quantity"
                        sx={{ width: '60%' }}
                        variant='filled'
                        color='secondary'
                        name='newcomerPacketsQty'
                        value={formik.values.newcomerPacketsQty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.newcomerPacketsQty ? formik.errors.newcomerPacketsQty : ""}
                        error={formik.touched.newcomerPacketsQty && Boolean(formik.errors.newcomerPacketsQty)}
                      />}
                      <FormControlLabel
                        control={<Checkbox
                          sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                          name='literatureRackWithPamphlets'
                          checked={formik.values.literatureRackWithPamphlets}
                          value={formik.values.literatureRackWithPamphlets}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          />}
                        label="Literature Rack w/ Pamphlets" sx={{ color: nchandiTheme.handiDarkBlue}}
                      />
                      {formik.values.literatureRackWithPamphlets &&
                      <TextField
                        label="*Rack Quantity"
                        sx={{ width: '60%' }}
                        variant='filled'
                        color='secondary'
                        name='literatureRackWithPamphletsQty'
                        value={formik.values.literatureRackWithPamphletsQty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.literatureRackWithPamphletsQty ? formik.errors.literatureRackWithPamphletsQty : ""}
                        error={formik.touched.literatureRackWithPamphletsQty && Boolean(formik.errors.literatureRackWithPamphletsQty)}
                      />}
                      <FormControlLabel
                        control={<Checkbox
                          sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                          name='other'
                          checked={formik.values.other}
                          value={formik.values.other}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          />}
                        label="Other" sx={{ color: nchandiTheme.handiDarkBlue}}
                      />
                      {formik.values.other &&
                      <TextField
                        label="*Other Quantity"
                        sx={{ width: '60%' }}
                        variant='filled'
                        color='secondary'
                        name='otherQty'
                        value={formik.values.otherQty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.otherQty ? formik.errors.otherQty : ""}
                        error={formik.touched.otherQty && Boolean(formik.errors.otherQty)}
                      />}
                    </FormGroup>
                  </Grid>
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
                  />
                </Grid>
                <Grid sm={10} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                  <Button
                    data-cy='nchandi-literature-request-confirm-btn'
                    color='secondary'
                    variant='contained'
                    sx={{ width: '50%', padding: 1, margin: 2 }}
                    size='large'
                    onClick={async () => { await validateSubmission(); }}
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