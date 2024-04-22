import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DeleteForever } from '@mui/icons-material';
import { Circle } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import PanelMembersDashboardDialog from '../PanelMembersDashboardDialog/PanelMembersDashboardDialog'
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const generateTableConfig = (handleSelection, handleAdd, handleDelete) => ({
  title: 'Panel Members',
  dataKey: d => d.id,
  handleSelection: handleSelection,
  toolbar: (
    <IconButton color='primary' onClick={handleAdd} data-cy='table-add-button'>
      <Add sx={{ color: nchandiTheme.handiGreen }} fontSize='large' />
    </IconButton>
  ),
  columns: [
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <DeleteForever fontSize='large' color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /> },
    { columnName: 'firstName', numeric: true, disablePadding: true, label: 'First Name', value: d => d.firstName },
    { columnName: 'lastName', numeric: true, disablePadding: false, label: 'Last Name', value: d => d.lastName },
    { columnName: 'email', numeric: true, disablePadding: false, label: 'Email', value: d => d.email },
    { columnName: 'phone', numeric: true, disablePadding: false, label: 'Phone Number', value: d => d.phone },
    { columnName: 'preferredContactMethod', numeric: true, disablePadding: false, label: 'Contact Method', value: d => d.preferredContactMethod },
    { columnName: '', numeric: true, disablePadding: false, label: 'Active', value: d => d.active ?  <Circle color='success'  /> : <Circle color='disabled' />},
  ]
});

const PanelMembersDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [panelMember, setPanelMember] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredContactMethod: ''
    },
    onSubmit: async (values) => {
      const { id } = values;
      try {
        if (id) {
          await nchandiWebsiteService.putPersonWithPersonId({}, id, values);
          setIsOpen(false);
        }else {
          await nchandiWebsiteService.postPerson({}, values);
          setIsOpen(false);
        }
        enqueueSnackbar('This member was successfully submitted.', snackbarMessages.success.configuration);
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
      const { data: panelMembers } = (await nchandiWebsiteService.getPeople()).data.filter(person => person.active);
      setTableData(panelMembers);
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
  const handleSave = () => {
    formik.submitForm();
    if (!formik.isValid) {
      enqueueSnackbar('There are fields missing in your form. Please fill out all the required * fields.', snackbarMessages.error.configuration);
    }
    formik.setSubmitting(false);
  };

  /**
   *
   */
  const handleClose = () => {
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
    setPanelMember(entity);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setPanelMember(null);
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    setLoading(true);
    try {
      const { id } = panelMember;
      await nchandiWebsiteService.deletePersonWithPersonId({}, id);
      enqueueSnackbar('This panel member was deleted.', snackbarMessages.success.configuration);
      fetchTableData();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the panel member!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setPanelMember(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete);

  return (
    <>
    {loading}
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} pb={3}>
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
      <Grid container sm={12} justifyContent={'center'}>
        <Grid sm={12}>
          <EnhancedTable
            data ={tableData}
            handleSelection={handleSelection}
            {...tableConfig}
          />
        </Grid>
      </Grid>
      <PanelMembersDashboardDialog
        formik={formik}
        isOpen={isOpen}
        handleSave={handleSave}
        handleClose={handleClose}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        entityName='Panel Member'
        primaryText={panelMember?.firstName + ' ' + panelMember?.lastName}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default PanelMembersDashboard;