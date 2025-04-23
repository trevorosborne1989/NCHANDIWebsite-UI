import React, { useState, useEffect, useCallback } from 'react';
import {
  Divider,
  Typography,
  IconButton,
  Skeleton,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { DeleteForever } from '@mui/icons-material';
import { Circle } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import FacilitiesDashboardDialog from '../FacilitiesDashboardDialog/FacilitiesDashboardDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const formatPhone = (phone) => {
  if (phone.length === 0) return;
  let areaCode = phone.substr(1, 3);
  let first3 = phone.substr(4, 3);
  let last4 = phone.substr(7, 4);
  return (areaCode + '-' + first3 + '-' + last4);
};

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
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <IconButton><DeleteForever fontSize='large'  color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /></IconButton> },
    { columnName: 'name', numeric: true, disablePadding: false, label: 'Facility Name', value: d => d.name },
    { columnName: 'type', numeric: true, disablePadding: true, label: 'Facility Type', value: d => d.type },
    { columnName: 'address', numeric: true, disablePadding: false, label: 'Address', value: d => d.address },
    { columnName: 'city', numeric: true, disablePadding: false, label: 'City', value: d => d.city },
    { columnName: 'state', numeric: true, disablePadding: false, label: 'State', value: d => d.state },
    { columnName: 'website', numeric: true, disablePadding: false, label: 'Website', value: d => d.website },
    { columnName: 'primaryContactName', numeric: true, disablePadding: false, label: 'Primary Contact Name', value: d => d.primaryContactName },
    { columnName: 'primaryContactEmail', numeric: true, disablePadding: false, label: 'Primary Contact Email', value: d => d.primaryContactEmail },
    { columnName: 'primaryContactPhone', numeric: true, disablePadding: false, label: 'Primary Phone Number', value: d => d.primaryContactPhone ? formatPhone(d.primaryContactPhone) : ''},
    { columnName: 'alternateContactName', numeric: true, disablePadding: false, label: 'Alternate Contact Name', value: d => d.alternateContactName },
    { columnName: 'alternateContactEmail', numeric: true, disablePadding: false, label: 'Alternate Contact Email', value: d => d.alternateContactEmail },
    { columnName: 'alternateContactPhone', numeric: true, disablePadding: false, label: 'Alternate Contact Phone', value: d => d.alternateContactPhone ? formatPhone(d.alternateContactPhone) : '' },
    { columnName: '', numeric: true, disablePadding: false, label: 'Active', value: d => d.active ? <IconButton><Circle color='success'  /></IconButton> : <IconButton><Circle color='disabled' /></IconButton> },
  ]
});

const FacilitiesDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [facility, setFacility] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      address: '',
      city: '',
      state: '',
      website: '',
      primaryContactName: '',
      primaryContactPhone: '',
      primaryContactEmail: '',
      alternateContact: false,
      alternateContactName: '',
      alternateContactPhone: '',
      alternateContactEmail: '',
      active: ''
    },
    onSubmit: async (values) => {
      const { id } = values;
      try {
        if (id) {
          await nchandiWebsiteService.putFacilitiesWithFacilityId({}, id, values);
          setIsOpen(false);
        }else {
          await nchandiWebsiteService.postFacilities({}, values);
          setIsOpen(false);
        }
        enqueueSnackbar('This facility was successfully submitted.', snackbarMessages.success.configuration);
        fetchTableData();
      } catch (err) {
        enqueueSnackbar('There was an error when submitting this form, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  /**
   *
   */
  const fetchTableData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: facilities } = await nchandiWebsiteService.getFacilities();
      setTableData(facilities);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
    if (!formik.values.alternateContact) {
      formik.setFieldValue("alternateContactName", '');
      formik.setFieldValue("alternateContactPhone", '');
      formik.setFieldValue("alternateContactEmail", '');
    }
    formik.submitForm();
    if (!formik.isValid) {
      enqueueSnackbar('There are fields missing in your form. Please fill out all required * fields.', snackbarMessages.error.configuration);
    }
    formik.setSubmitting(false);
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
    setLoading(true);
    try {
      const { id } = facility;
      await nchandiWebsiteService.deleteFacilitiesWithFacilityId({}, id);
      enqueueSnackbar('This facility was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the facility!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setFacility(null);
      setIsDeleteDialogOpen(false);
      fetchTableData();
    }
  };

  const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete);

  return (
    <>
    {loading}
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
        {loading ?
          <Skeleton variant='rectangular' width='90%' height={250}/>
          :
          <Grid sm={12}>
            <EnhancedTable
              data ={tableData}
              {...tableConfig}
            />
          </Grid>
        }
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
        primaryText={facility?.name}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default FacilitiesDashboard;