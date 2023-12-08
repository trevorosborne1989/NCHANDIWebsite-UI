import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, IconButton } from '@mui/material';
import { Add, DeleteForever } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import PanelMembersDashboardDialog from '../PanelMembersDashboardDialog/PanelMembersDashboardDialog'
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

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
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <DeleteForever fontSize='large'  color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /> },
    { columnName: 'firstName', numeric: true, disablePadding: true, label: 'First Name', value: d => d.firstName },
    { columnName: 'lastName', numeric: true, disablePadding: false, label: 'Last Name', value: d => d.lastName },
    { columnName: 'email', numeric: true, disablePadding: false, label: 'Email', value: d => d.email },
    { columnName: 'phoneNumber', numeric: true, disablePadding: false, label: 'Phone Number', value: d => d.phoneNumber },
    { columnName: 'contactMethod', numeric: true, disablePadding: false, label: 'Contact Method', value: d => d.contactMethod }
  ]
});

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
  const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [panelMember, setPanelMember] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
          setIsOpen(false);
        }else {
          // await ectsService.postEctsstaff({}, values);
          setIsOpen(false);
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

  /**
   *
   */
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
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all the required * fields.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
    }, 1000);
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
    // setLoading(true);
    try {
      // const { id } = panelMember;
      // await nchandiWebsiteService.deletePanelMemberById(id);
      enqueueSnackbar('This panel member was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the panel member!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setPanelMember(null);
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