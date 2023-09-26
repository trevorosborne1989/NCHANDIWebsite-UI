import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, IconButton, Box } from '@mui/material';
import { Add, DeleteForever } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import RequestsDashboardDialog from '../RequestsDashboardDialog/RequestsDashboardDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import TableConfig from './TableConfig';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

const generateTableConfig = (handleAdd, handleDelete, handleSelection) => ({
  tableTitle: 'Facilities',
  dataKey: d => d.id,
  onSelection: handleSelection,
  toolbar: (
    <IconButton color='primary' onClick={handleAdd} data-cy='table-add-button'>
      <Add sx={{ color: 'white' }} fontSize='large' />
    </IconButton>
  ),
  columns: [
    { columnName: 'facilityName', numeric: true, disablePadding: false, label: 'Facility Name', value: d => d.facilityName },
    { columnName: 'facilityType', numeric: true, disablePadding: false, label: 'Facility Type', value: d => d.facilityType },
    { columnName: 'address', numeric: true, disablePadding: false, label: 'Address', value: d => d.address },
    { columnName: 'city', numeric: true, disablePadding: false, label: 'City', value: d => d.city },
    { columnName: 'state', numeric: true, disablePadding: false, label: 'State', value: d => d.state },
    { columnName: 'website', numeric: true, disablePadding: false, label: 'Website', value: d => d.website },
    { columnName: 'primaryContactName', numeric: true, disablePadding: false, label: 'Primary Contact Name', value: d => d.primaryContactName },
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <DeleteForeverIcon color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /> }
  ]
});

function createData(id, name, facilityType, address, city, state, website, primaryContactName, primaryContactEmail, primaryPhoneNumber, altContactName, altContactEmail, altPhoneNumber, active) {
  return {
    id,
    name,
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

const RequestsDashboard = () => {
  const [requestOpen, setRequestOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [request, setRequest] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: '',
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
          setRequestOpen(false);
        }else {
          // await ectsService.postEctsstaff({}, values);
          setRequestOpen(false);
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

  const handleSave = () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all required * fields.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
    }, 1000);
  };

  const handleClose = () => {
    formik.handleReset();
    setRequestOpen(false);
  };

  const handleAdd = () => {
    formik.handleReset();
    setRequestOpen(true);
  };

  const handleSelection = (row) => {
    formik.setValues(row);
    setRequestOpen(true);
  };

  /**
   *
   */
  const handleDelete = (e, id) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
    setRequest(id);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setRequest(null);
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    // setLoading(true);
    try {
      const { id } = request;
      await nchandiWebsiteService.deleteRequestById(id);
      enqueueSnackbar('This request was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the Request!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setRequest(null);
      setIsDeleteDialogOpen(false);
      // fetchRequests();
    }
  };

  const tableConfig = generateTableConfig(handleAdd, handleDelete, handleSelection);

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
      <Grid container sm={12} justifyContent={'center'}>
        <Grid sm={12}>
          <EnhancedTable
            data ={tableData}
            {...tableConfig}
          />
        </Grid>
      </Grid>
      <RequestsDashboardDialog
        formik={formik}
        isOpen={dialogOpen}
        handleSave={handleSave}
        handleClose={handleClose}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        entityName='Request'
        primaryText={request?.fullName}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default RequestsDashboard;