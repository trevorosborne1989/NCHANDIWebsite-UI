import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, IconButton, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import PanelMembersDashboardDialog from '../PanelMembersDashboardDialog/PanelMembersDashboardDialog'
import { yupSchema } from './ValidationSchema';
import TableConfig from './TableConfig';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

function createData(id, firstName, lastName, email, phoneNumber, contactMethod) {
  return {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    contactMethod
  };
}

const panelMembers = [
  createData('1', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('2', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('3', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('4', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('5', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('6', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('7', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('8', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('9', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('10', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('12', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('13', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('14', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('15', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('16', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
  createData('17', 'Bill', 'Johnson', 'bjognson@gmail.com', '760-561-6754', 'Text'),
];

const PanelMembersDashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      contactMethod: ''
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
        enqueueSnackbar('This member was successfully submitted.', snackbarMessages.success.configuration);
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
      // const { data: panelMembers } = await nchandiWebsiteService.getPanelMembers();
      setTableData(panelMembers);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const handleDialogSave = () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all the required * fields.', snackbarMessages.error.configuration);
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
            Panel Members Dashboard
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
          data-cy='panel-member-dashboard-add-button'
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
      <PanelMembersDashboardDialog
        formik={formik}
        isOpen={dialogOpen}
        handleSave={handleDialogSave}
        handleClose={handleDialogClose}
      />
    </>
  )
}

export default PanelMembersDashboard;