import React, { useState, useEffect, useCallback } from 'react';
import {
  Divider,
  Typography,
  IconButton,
  Skeleton,
  Button,
} from '@mui/material';
import {
  DataGrid,
  GridAddIcon,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { DeleteForever, FileDownloadOutlined } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { CSVLink } from 'react-csv';
import CommitteeDashboardDialog from '../CommitteeDashboardDialog/CommitteeDashboardDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme, nchandiTableStyles } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'
import { Tooltip } from '@mui/material';

const nchandiWebsiteService = new NCHANDIWebsiteService();

const formatPhone = (phone) => {
  if (phone.length === 0) return;
  let areaCode = phone.substr(1, 3);
  let first3 = phone.substr(4, 3);
  let last4 = phone.substr(7, 4);
  return (areaCode + '-' + first3 + '-' + last4);
};

const generateTableConfig = (handleAdd, handleRemove, tableData) => ({
  slots: { toolbar: () => {
      return (
        <GridToolbarContainer sx={{ backgroundColor: nchandiTheme.handiSecondaryWhite }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <CSVLink data={tableData} filename="export.csv" headers={exportHeaders} style={{ textDecoration: 'none' }}>
            <Tooltip title="Export CSV" placement='bottom'>
              <IconButton color="primary" size='small' sx={{
                  borderRadius: 0,
                  '& .MuiTouchRipple-root': {
                    borderRadius: 0,
                  },
                }} 
              >
                <FileDownloadOutlined />
                <Typography fontSize={'13px'} pl={.5}>
                  EXPORT
                </Typography>
              </IconButton>
            </Tooltip>
          </CSVLink>
          <Button color="primary" startIcon={<GridAddIcon />} onClick={handleAdd} >
            New Row
          </Button>
        </GridToolbarContainer>
      )
    }
  },
  columns: [
    { field: 'id', headerName: 'ID', width: 0, visible: false },
    { field: '', headerName: '', width: 75, renderCell: (params) => (
      <Tooltip title={"Remove from Committee list."} >
        <IconButton>
          <DeleteForever fontSize='large' color='error' onClick={(e) => handleRemove(e, params?.row)} data-cy='table-delete-btn' />
        </IconButton>
      </Tooltip>
      )
    },
    { field: 'firstName', headerName: 'First Name', width: 100 },
    { field: 'lastName', headerName: 'Last Name', width: 100 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone Number', width: 150, valueFormatter: (value, row) => value ? formatPhone(value) : '' },
    { field: 'preferredContactMethod', headerName: 'Contact Method', width: 150 },
    { field: 'commitment', headerName: 'Commitment', width: 150 }
  ]
});

const exportHeaders = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" }, // Dot notation handles the nesting
  { label: "Email", key: "email" },
  { label: "Phone Number", key: "phone" },
  { label: "Contact Method", key: "preferredContactMethod" },
  { label: "Commitment", key: "commitment" }
];

const generatePassword = (length = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
  }
  return password;
}

const CommitteeDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [peopleData, setPeopleData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [committeeMember, setCommitteeMember] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      committeeMember: null,
      commitment: ''
    },
    onSubmit: async (values) => {
      try {
        values.committeeMember.commitment = values.commitment;
        const { data: { id } } = await nchandiWebsiteService.putPersonWithPersonId({}, values.committeeMember.id, values.committeeMember);
        await nchandiWebsiteService.resetPassword({}, values.committeeMember?.email);
        values.id = id;
        setTableData(prevData => [values.committeeMember, ...prevData]);
        setIsOpen(false);
        enqueueSnackbar('This committee member was successfully submitted.', snackbarMessages.success.configuration);
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
      const people = (await nchandiWebsiteService.getPeople()).data;
      setPeopleData(people);
      setTableData(people.filter(person => person.commitment));
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
    formik.setFieldValue('committeeMember.password', generatePassword());
    formik.submitForm();
    if (!formik.isValid) {
      enqueueSnackbar('There are fields missing in your form. Please fill out all the required fields.', snackbarMessages.error.configuration);
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
  const handleClear = (e, field) => {
    formik.setFieldValue(field, null);
  };

  /**
   *
   */
  const handleRemove = (e, row) => {
    e.stopPropagation();
    setCommitteeMember(row);
    setIsDeleteDialogOpen(true);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setCommitteeMember('');
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    setLoading(true);
    const { id } = committeeMember;
    committeeMember.commitment = null;
    try {
      await nchandiWebsiteService.putPersonWithPersonId({}, id, committeeMember);
      enqueueSnackbar('This member was removed from the committee list.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error removing the committee member from the list!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setCommitteeMember('');
      setTableData(tableData.filter(row => row?.id !== id));
      setIsDeleteDialogOpen(false);
    }
  };

  const tableConfig = generateTableConfig(handleAdd, handleRemove, tableData);

  return (
    <>
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} pb={3}>
        <Grid sm={10}>
          <Typography variant="h4" color={'white'} >
            Committee Dashboard
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
          <Skeleton variant='rectangular' width='90%' height={500}/>
          :
          <Grid sm={12} height={500} width={100}>
            <DataGrid
              rows={tableData}
              rowSelectionModel={committeeMember}
              loading={loading}
              {...tableConfig}
              {...nchandiTableStyles}
            />
          </Grid>
        }
      </Grid>
      <CommitteeDashboardDialog
        formik={formik}
        peopleData={peopleData}
        isOpen={isOpen}
        handleClear={handleClear}
        handleSave={handleSave}
        handleClose={handleClose}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        entityName='Committee Member'
        primaryText={committeeMember?.firstName + ' ' + committeeMember?.lastName}
        secondaryText={"This member will only be removed from the committee list, not deleted."}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default CommitteeDashboard;