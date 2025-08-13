import React, { useState, useEffect, useCallback } from 'react';
import {
  Divider,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Skeleton,
  Button,
} from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  GridAddIcon,
  GridToolbarContainer } from '@mui/x-data-grid';
import { DeleteForever, Wc, Man, Woman } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import PanelsDashboardDialog from '../PanelsDashboardDialog/PanelsDashboardDialog'
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme, nchandiTableStyles } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const generateTableConfig = (handleSelection, handleAdd, handleDelete, handleGenderColumn) => ({
  onRowSelectionModelChange: handleSelection,
  slots: { toolbar: () => {
      return (
        <GridToolbarContainer sx={{ backgroundColor: nchandiTheme.handiSecondaryWhite }}>
          <GridToolbar />
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
        <DeleteForever fontSize='large' color='error' onClick={(e) => handleDelete(e, params?.row?.id)} data-cy='table-delete-btn' />
      </IconButton>
      )
    },
    { field: 'dayOfWeek', headerName: 'Day', width: 125 },
    { field: 'weekOfMonth', headerName: 'Week', width: 75 },
    { field: 'eventTime', headerName: 'Time', width: 100 },
    { field: 'facility', headerName: 'Facility', width: 250, valueGetter: (value, row) => row?.facility?.name },
    { field: 'address', headerName: 'Address', width: 150, valueGetter: (value, row) => row?.facility?.address },
    { field: 'city', headerName: 'City', width: 100, valueGetter: (value, row) => row?.facility?.city },
    { field: 'gender', headerName: 'Gender', width: 75, renderCell: (params) => (handleGenderColumn(params?.row)) },
    { field: 'markAsMembersNeeded', headerName: 'Volunteers Needed?', type: 'boolean', width: 175},
    { field: 'numberNeeded', headerName: '# Needed', width: 100, valueGetter: (value, row) => (row?.numberNeeded ? row?.numberNeeded : 0) },
    { field: 'boardChampion', headerName: 'Board Champion', width: 150, valueGetter: (value, row) => row?.boardChampion ? row?.boardChampion?.firstName + ' ' + row?.boardChampion?.lastName : 'empty' },
    { field: 'panelCoordinator', headerName: 'Panel Coordinator', width: 150, valueGetter: (value, row) => row?.panelCoordinator ? row?.panelCoordinator?.firstName + ' ' + row?.panelCoordinator?.lastName : 'empty' },
    { field: 'panelLeader', headerName: 'Panel Leader', width: 150, valueGetter: (value, row) => row?.panelLeader ? row?.panelLeader?.firstName + ' ' + row?.panelLeader?.lastName : 'empty' },
    { field: 'panelMember1', headerName: 'Panel Member 1', width: 150, valueGetter: (value, row) => row?.panelMember1 ? row?.panelMember1?.firstName + ' ' + row?.panelMember1?.lastName : 'empty' },
    { field: 'panelMember2', headerName: 'Panel Member 2', width: 150, valueGetter: (value, row) => row?.panelMember2 ? row?.panelMember2?.firstName + ' ' + row?.panelMember2?.lastName : 'empty' },
    { field: 'panelMember3', headerName: 'Panel Member 3', width: 150, valueGetter: (value, row) => row?.panelMember3 ? row?.panelMember3?.firstName + ' ' + row?.panelMember3?.lastName : 'empty' },
    { field: 'panelMember4', headerName: 'Panel Member 4', width: 150, valueGetter: (value, row) => row?.panelMember4 ? row?.panelMember4?.firstName + ' ' + row?.panelMember4?.lastName : 'empty' },
    { field: 'panelMember5', headerName: 'Panel Member 5', width: 150, valueGetter: (value, row) => row?.panelMember5 ? row?.panelMember5?.firstName + ' ' + row?.panelMember5?.lastName : 'empty' }
  ]
});

const PanelsDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [panel, setPanel] = useState('');
  const [facilities, setFacilties] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      id: '',
      dayOfWeek: '',
      weekOfMonth: '',
      eventTime: '12:00 AM',
      facility: '',
      gender: '',
      markAsMembersNeeded: false,
      numberNeeded: 0,
      boardChampion: null,
      panelCoordinator: null,
      panelLeader: null,
      panelMember1: null,
      panelMember2: null,
      panelMember3: null,
      panelMember4: null,
      panelMember5: null
    },
    onSubmit: async (values) => {
      const { id } = values;
      try {
        if (id) {
          await nchandiWebsiteService.putPanelWithPanelId({}, id, values);
          setIsOpen(false);
        } else {
          await nchandiWebsiteService.postPanel({}, values);
          setIsOpen(false);
        }
        enqueueSnackbar('This panel was successfully submitted.', snackbarMessages.success.configuration);
      } catch (err) {
        enqueueSnackbar('There was an error when submitting this form, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
      fetchTableData();
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
      const { data: panels } = await nchandiWebsiteService.getAllPanels();
      setTableData(panels);
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
  const fetchFacilityData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: facilities } = await nchandiWebsiteService.getFacilities();
      setFacilties(facilities);
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
    fetchFacilityData();
  }, [fetchFacilityData]);

  /**
   *
   */
  const fetchPeopleData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: people } = await nchandiWebsiteService.getPeople();
      setPeople(people);
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
    fetchPeopleData();
  }, [fetchPeopleData]);

  /**
   *
   */
  const handleGenderColumn = (row) => {
    if (row?.gender === 'Male') {
      return <IconButton sx={{ color: nchandiTheme.handiCyan }} >
          <Box>
            <Man fontSize='large' />
          </Box>
        </IconButton>
    } else if (row?.gender === 'Female') {
        return <IconButton sx={{ color: nchandiTheme.handiLightGreen }}>
            <Box>
              <Woman fontSize='large' />
            </Box>
          </IconButton>
    } else {
      return <IconButton sx={{ color: nchandiTheme.handiLightCoral }}  >
          <Box>
            <Wc fontSize='large' />
          </Box>
        </IconButton>
    }
  };

  /**
   *
   */
  const handleSave = () => {
    formik.setFieldValue('active', true);
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
  const handleCheckbox = (e) => {
    formik.setFieldValue('numberNeeded', '');
    formik.setFieldValue('markAsMembersNeeded', e.target.checked);
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
  const handleDelete = (e, id) => {
    e.stopPropagation();
    setPanel((tableData.filter(row => row?.id === id))[0]);
    setIsDeleteDialogOpen(true);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setPanel('');
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    setLoading(true);
    try {
      const { id } = panel;
      await nchandiWebsiteService.deletePanelsWithPanelId({}, id);
      enqueueSnackbar('This panel was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the panel!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
      setPanel('');
      setIsDeleteDialogOpen(false);
      fetchTableData();
    }
  };

  const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete, handleGenderColumn);

  return (
    <>
    {loading && <CircularProgress />}
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} pb={3}>
        <Grid sm={10}>
          <Typography variant="h4" color={'white'} >
            Panels Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Grid container sm={12} justifyContent={'center'} pb={5}>
        <Grid sm={8}>
          <Divider sx={{ background: 'white' }} />
        </Grid>
      </Grid>
      <Grid container sm={12} justifyContent={'center'}>
        {loading ?
          <Skeleton variant='rectangular' width='90%' height={250}/>
          :
          <Grid sm={12} height={500} width={100}>
            <DataGrid
              rows={tableData}
              rowSelectionModel={panel}
              loading={loading}
              {...tableConfig}
              {...nchandiTableStyles}
            />
          </Grid>
        }
      </Grid>
      <PanelsDashboardDialog
        formik={formik}
        facilityData={facilities}
        peopleData={people}
        isOpen={isOpen}
        handleCheckbox={handleCheckbox}
        handleClear={handleClear}
        handleSave={handleSave}
        handleClose={handleClose}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        entityName='Panel'
        primaryText={panel?.facility?.name}
        secondaryText={panel?.weekOfMonth + ' - ' + panel?.dayOfWeek + ' at ' + panel?.eventTime}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default PanelsDashboard;