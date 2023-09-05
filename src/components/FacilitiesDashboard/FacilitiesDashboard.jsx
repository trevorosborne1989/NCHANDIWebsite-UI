import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, IconButton, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import FacilitiesDashboardDialog from '../FacilitiesDashboardDialog/FacilitiesDashboardDialog';
import { yupSchema } from './ValidationSchema';
import TableConfig from './TableConfig';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

function createData(id, facilityName, facilityType, address, city, state, website, primaryContactName, primaryContactEmail, primaryPhoneNumber, altContactName, altContactEmail, altPhoneNumber, active) {
  return {
    id,
    facilityName,
    facilityType,
    address,
    city,
    state,
    website,
    primaryContactName,
    primaryContactEmail,
    primaryPhoneNumber,
    altContactName,
    altContactEmail,
    altPhoneNumber,
    active
  };
}

const facilities = [
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'fshnc.org', 'Yes'),
];

const FacilitiesDashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      facilityName: '',
      facilityType: '',
      address: '',
      city: '',
      state: '',
      website: '',
      primaryContactName: '',
      primaryContactEmail: '',
      primaryPhoneNumber: '',
      altContactName: '',
      altContactEmail: '',
      altPhoneNumber: '',
      active: ''
    },
    onSubmit: async (values) => {
      const { id } = values;
      try {

        if (id) {
          // await ectsService.putEctsstaffWithEctsStaffId({}, id, values);
          setDialogOpen(false);
        }else {
          // await ectsService.postEctsstaff({}, values);
          setDialogOpen(false);
        }
        enqueueSnackbar('This facility was successfully submitted.', snackbarMessages.success.configuration);
      } catch (err) {
        enqueueSnackbar('There was an error when submitting this form, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  // const fetchData = useCallback(params => ectsService.getEctsstaff(params), []); //Try This!!!

  const fetchTableData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: facilities } = await nchandiWebsiteService.getFacilities);
      setTableData(facilities);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(No);
    }
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const handleDialogSave = () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all required * fields.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
    }, 1000);
  };

  const handleDialogClose = () => {
    formik.handleReset();
    setDialogOpen(false);
  };

  const handleNew = () => {
    formik.handleReset();
    setDialogOpen(true);
  };

  const handleRowSelection = (row) => {
    formik.setValues(row);
    setDialogOpen(true);
  };

  return (
    <>
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} py={3} pb={3}>
        <Grid sm={10}>
          <Typography variant="h4" color={'white'} >
            Facilities Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Grid container sm={12} justifyContent={'center'} pb={5}>
        <Grid sm={8}>
          <Divider sx={{background: 'white'}} />
        </Grid>
      </Grid>
      <Box display='flex' alignItems='center' justifyContent='flex-end'>
        <IconButton
          color='primary'
          onClick={handleNew}
          data-cy='facilities-dashboard-add-button'
        >
          <Add sx={{ color: 'white' }} fontSize='large' />
        </IconButton>
      </Box>
      <Grid container sm={12} justifyContent={'center'}>
        <Grid sm={12}>
          <EnhancedTable
            data ={tableData}
            handleSelection={handleRowSelection}
            {...TableConfig}
          />
        </Grid>
      </Grid>
      <FacilitiesDashboardDialog
        formik={formik}
        isOpen={dialogOpen}
        handleSave={handleDialogSave}
        handleClose={handleDialogClose}
      />
    </>
  )
}

export default FacilitiesDashboard;