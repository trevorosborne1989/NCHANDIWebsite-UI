import { useState, useEffect, useCallback } from 'react';
import {
  Divider,
  Typography,
  IconButton,
  Skeleton,
  Button,
  Tooltip,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridAddIcon,
  GridToolbarContainer 
} from '@mui/x-data-grid';
import { DeleteForever, FileDownloadOutlined } from '@mui/icons-material';
import { Circle } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { CSVLink } from 'react-csv';
import PanelMembersDashboardDialog from '../PanelMembersDashboardDialog/PanelMembersDashboardDialog'
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme, nchandiTableStyles } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const formatPhone = (phone) => {
  if (phone.length === 0) return;
  let areaCode = phone.substr(1, 3);
  let first3 = phone.substr(4, 3);
  let last4 = phone.substr(7, 4);
  return (areaCode + '-' + first3 + '-' + last4);
};

const generateTableConfig = (handleSelection, handleAdd, handleDelete, handleActive, tableData) => ({
  onRowSelectionModelChange: handleSelection,
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
      <IconButton>
        <DeleteForever fontSize='large' color='error' onClick={(e) => handleDelete(e, params?.row)} data-cy='table-delete-btn' />
      </IconButton>
      )
    },
    { field: 'firstName', headerName: 'First Name', width: 100 },
    { field: 'lastName', headerName: 'Last Name', width: 100 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone Number', width: 150, valueFormatter: (value, row) => value ? formatPhone(value) : '' },
    { field: 'preferredContactMethod', headerName: 'Contact Method', width: 150 },
    { field: 'active', headerName: 'Active', width: 75, renderCell: (params) => (
      <IconButton>
        <Circle color={handleActive(params?.row)}  />
      </IconButton>
      )
    }
  ]
});

const exportHeaders = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" }, // Dot notation handles the nesting
  { label: "Email", key: "email" },
  { label: "Phone Number", key: "phone" },
  { label: "Contact Method", key: "preferredContactMethod" },
  { label: "Active", key: "active" },
];

const PanelMembersDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [panelMember, setPanelMember] = useState('');
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
          setTableData(prevData =>
            prevData.map(row =>
              row.id === id
                ? { ...row, ...values }
                : row
            )
          );
          setIsOpen(false);
        }else {
          const { data: { id } } = await nchandiWebsiteService.postPerson({}, values);
          values.id = id;
          setTableData(prevData => [values, ...prevData]);
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

  /**
   *
   */
  const fetchTableData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: members } = await nchandiWebsiteService.getPeople();
      const { data: panels } = await nchandiWebsiteService.getAllPanels();
      const panelMembers = markActiveMembers(members, panels);
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
  const markActiveMembers = (members, panels) => {
    const allActiveMembers = [];
    panels.forEach((panel) => {
      let panelActiveMembers = ['boardChampion', 'panelCoordinator', 'panelLeader', 'panelMember1', 'panelMember2', 'panelMember3', 'panelMember4', 'panelMember5'].map(k => panel[k]).filter((member) => member !== null);
      panelActiveMembers.forEach((activeMember) => {
        activeMember['active'] = true
        allActiveMembers.push(activeMember);
      });
    });
    const activeAndInactive = allActiveMembers.concat(...members);
    return activeAndInactive.filter((elem, index, self) => self.findIndex(
      (t) => {return (t?.firstName === elem?.firstName && t?.lastName === elem?.lastName)}) === index)
  };

  const handleActive = (row) => {
    if (row?.active) {
      return 'info';
    } else {
      return 'disabled';
    }
  }

  /**
   *
   */
  const handleSave = () => {
    formik.submitForm();
    if (!formik.isValid) {
      enqueueSnackbar('There are fields missing or invalid in your form. Please fill out all the required fields.', snackbarMessages.error.configuration);
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
  const handleSelection = (id) => {
    if (id.length !== 0) {
    formik.setValues(tableData.filter(row => row?.id === id[0])[0]);
    setIsOpen(true);
    }
  };

  /**
   *
   */
  const handleDelete = (e, row) => {
    e.stopPropagation();
    setPanelMember(row);
    setIsDeleteDialogOpen(true);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setPanelMember('');
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    setLoading(true);
    const { id } = panelMember;
    try {
      await nchandiWebsiteService.deletePersonWithPersonId({}, id);
      enqueueSnackbar('This panel member was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the panel member!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setPanelMember('');
      setTableData(tableData.filter(row => row?.id !== id));
      setIsDeleteDialogOpen(false);
    }
  };

  const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete, handleActive, tableData);

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
        {loading ?
          <Skeleton variant='rectangular' width='90%' height={250}/>
          :
          <Grid sm={12} height={500} width={100}>
            <DataGrid
              rows={tableData}
              rowSelectionModel={panelMember}
              loading={loading}
              {...tableConfig}
              {...nchandiTableStyles}
            />
          </Grid>
        }
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