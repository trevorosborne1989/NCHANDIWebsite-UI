import React, { useState, useEffect, useCallback } from 'react';
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
import FacilitiesDashboardDialog from '../FacilitiesDashboardDialog/FacilitiesDashboardDialog';
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

const generateTableConfig = (handleSelection, handleAdd, handleDelete , handleActive, tableData) => ({
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
    { field: 'name', headerName: 'Facility Name', width: 200 },
    { field: 'type', headerName: 'Facility Type', width: 125 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'state', headerName: 'State', width: 75 },
    { field: 'website', headerName: 'Website', width: 200 },
    { field: 'primaryContactName', headerName: 'Primary Contact Name', width: 200, valueFormatter: (value, row) => value ? value : 'none' },
    { field: 'primaryContactEmail', headerName: 'Primary Contact Email', width: 200, valueFormatter: (value, row) => value ? value : 'none' },
    { field: 'primaryContactPhone', headerName: 'Primary Phone #', width: 150, valueFormatter: (value, row) => value ? formatPhone(value) : '' },
    { field: 'alternateContactName', headerName: 'Alternate Contact Name', width: 200, valueFormatter: (value, row) => value ? value : 'none' },
    { field: 'alternateContactEmail', headerName: 'Alternate Contact Email', width: 200, valueFormatter: (value, row) => value ? value : 'none' },
    { field: 'alternateContactPhone', headerName: 'Alternate Phone #', width: 150, valueFormatter: (value, row) => value ? formatPhone(value) : 'none' },
    { field: 'active', headerName: 'Active', width: 75, renderCell: (params) => (
      <IconButton>
        <Circle color={handleActive(params.row)}  />
      </IconButton>
      )
    }
  ]
});

const exportHeaders = [
  { label: "Facility Name", key: "name" },
  { label: "Facility Type", key: "type" }, // Dot notation handles the nesting
  { label: "Address", key: "address" },
  { label: "City", key: "city" },
  { label: "State", key: "state" },
  { label: "Website", key: "website" },
  { label: "Primary Contact Name", key: "primaryContactName" },
  { label: "Primary Contact Email", key: "primaryContactEmail" },
  { label: "Primary Phone #", key: "primaryContactPhone" },
  { label: "Alternate Contact Name", key: "alternateContactName" },
  { label: "Alternate Contact Email", key: "alternateContactEmail" },
  { label: "Alternate Phone #", key: "alternateContactPhone" },
  { label: "Active", key: "active" }
];

const FacilitiesDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [facility, setFacility] = useState('');
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
          setTableData(prevData =>
            prevData.map(row =>
              row.id === id
                ? { ...row, ...values }
                : row
            )
          );
          setIsOpen(false);
        }else {
          const { data: { id } } = await nchandiWebsiteService.postFacilities({}, values);
          values.id = id;
          setTableData(prevData => [values, ...prevData]);
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
    setFacility(row);
    setIsDeleteDialogOpen(true);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setFacility('');
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    setLoading(true);
    const { id } = facility;
    try {
      await nchandiWebsiteService.deleteFacilitiesWithFacilityId({}, id);
      enqueueSnackbar('This facility was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the facility!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setFacility('');
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
          <Grid sm={12} height={500} width={100}>
            <DataGrid
              rows={tableData}
              rowSelectionModel={facility}
              loading={loading}
              {...tableConfig}
              {...nchandiTableStyles}
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