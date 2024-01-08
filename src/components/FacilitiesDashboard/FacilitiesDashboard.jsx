import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, IconButton } from '@mui/material';
import { Add, DeleteForever } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import FacilitiesDashboardDialog from '../FacilitiesDashboardDialog/FacilitiesDashboardDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

const generateTableConfig = (handleSelection, handleAdd, handleDelete) => ({
  title: 'Facilities',
  dataKey: d => d.id,
  handleSelection: handleSelection,
  toolbar: (
    <IconButton color='primary' onClick={handleAdd} data-cy='table-add-button'>
      <Add sx={{ color: nchandiTheme.handiGreen }} fontSize='large' />
    </IconButton>
  ),
  columns: [
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <DeleteForever fontSize='large'  color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /> },
    { columnName: 'facilityName', numeric: true, disablePadding: false, label: 'Facility Name', value: d => d.facilityName },
    { columnName: 'facilityType', numeric: true, disablePadding: true, label: 'Facility Type', value: d => d.facilityType },
    { columnName: 'address', numeric: true, disablePadding: false, label: 'Address', value: d => d.address },
    { columnName: 'city', numeric: true, disablePadding: false, label: 'City', value: d => d.city },
    { columnName: 'state', numeric: true, disablePadding: false, label: 'State', value: d => d.state },
    { columnName: 'website', numeric: true, disablePadding: false, label: 'Website', value: d => d.website },
    { columnName: 'primaryContactName', numeric: true, disablePadding: false, label: 'Primary Contact Name', value: d => d.primaryContactName },
    { columnName: 'primaryContactEmail', numeric: true, disablePadding: false, label: 'Primary Contact Email', value: d => d.primaryContactEmail },
    { columnName: 'primaryPhoneNumber', numeric: true, disablePadding: false, label: 'Primary Phone Number', value: d => d.primaryPhoneNumber },
    { columnName: 'altContactName', numeric: true, disablePadding: false, label: 'Alternate Contact Name', value: d => d.altContactName },
    { columnName: 'altContactEmail', numeric: true, disablePadding: false, label: 'Alternate Contact Email', value: d => d.altContactEmail },
    { columnName: 'altPhoneNumber', numeric: true, disablePadding: false, label: 'Alternate Phone Number', value: d => d.altPhoneNumber },
    { columnName: 'active', numeric: true, disablePadding: false, label: 'Active', value: d => d.active }
  ]
});

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
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'No'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
  createData('1', 'Vista Jail', 'Correctional', '325 S Melrose Drive # 200', 'Vista', 'CA', 'fshnc.org', 'Shalimar Jackson', 'shalimar.jackson@sdsheriff.org', '619-258-3031', 'Glenn Joiner', 'trailbosss@yahoo.com', '760-803-6026', 'Yes'),
];

const FacilitiesDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [facility, setFacility] = useState(null);
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
          setIsOpen(false);
        }else {
          // await ectsService.postEctsstaff({}, values);
          setIsOpen(false);
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

  /**
   *
   */
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

  /**
   *
   */
  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  /**
   *
   */
  const handleDialogSave = () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all required * fields.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
    }, 1000);
  };

  /**
   *
   */
  const handleDialogClose = () => {
    formik.handleReset();
    setIsOpen(false);
  };

  /**
   *
   */
  const handleAdd = () => {
    formik.handleReset();
    setIsOpen(true);
  };

  /**
   *
   */
  const handleSelection = (row) => {
    formik.setValues(row);
    setIsOpen(true);
  };

  /**
   *
   */
  const handleDelete = (e, entity) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
    setFacility(entity);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setFacility(null);
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    // setLoading(true);
    try {
      // const { id } = facility;
      // await nchandiWebsiteService.deleteFacilityById(id);
      enqueueSnackbar('This facility was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the facility!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setFacility(null);
      setIsDeleteDialogOpen(false);
      // fetchRequests();
    }
  };

  const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete);

  return (
    <>
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} pb={3}>
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
      <FacilitiesDashboardDialog
        formik={formik}
        isOpen={isOpen}
        handleSave={handleDialogSave}
        handleClose={handleDialogClose}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        entityName='Facility'
        primaryText={facility?.facilityName}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default FacilitiesDashboard;