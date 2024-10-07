import React, { useState, useEffect, useCallback } from 'react';
import {
  Divider,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Skeleton,
} from '@mui/material';
import { Add, DeleteForever, Female, Male, Wc } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import PanelsDashboardDialog from '../PanelsDashboardDialog/PanelsDashboardDialog'
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const handleGenderColumn = (gender) => {
  if (gender === 'Male') {
    return <IconButton sx={{ color: nchandiTheme.handiGreen }} >
        <Box>
        <Male fontSize='large' />
        <Typography>M</Typography>
        </Box>
      </IconButton>
  } else if (gender === 'Female') {
      return <IconButton sx={{ color: nchandiTheme.handiDarkYellow }}>
          <Box>
          <Female fontSize='large' />
          <Typography>F</Typography>
          </Box>
        </IconButton>
  } else {
    return <IconButton sx={{ color: nchandiTheme.handiYellow }}  >
        <Box>
        <Wc fontSize='large' />
        <Typography>M/F</Typography>
        </Box>
      </IconButton>
  }
};

const generateTableConfig = (handleSelection, handleAdd, handleDelete) => ({
  title: 'Panels',
  dataKey: d => d.id,
  handleSelection: handleSelection,
  toolbar: (
    <IconButton color='primary' onClick={handleAdd} data-cy='table-add-button'>
      <Add sx={{ color: nchandiTheme.handiGreen }} fontSize='large' />
    </IconButton>
  ),
  columns: [
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <IconButton><DeleteForever fontSize='large' color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /></IconButton> },
    { columnName: 'dayOfWeek', numeric: true, disablePadding: false, label: 'Day of Week', value: d => d.dayOfWeek },
    { columnName: 'weekOfMonth', numeric: true, disablePadding: true, label: 'Week of Month', value: d => d.weekOfMonth },
    { columnName: 'eventTime', numeric: true, disablePadding: false, label: 'Time', value: d => d.eventTime },
    { columnName: 'facility', numeric: true, disablePadding: false, label: 'Facility', value: d => d.facility?.name },
    { columnName: 'address', numeric: true, disablePadding: false, label: 'Address', value: d => d.facility?.address },
    { columnName: 'city', numeric: true, disablePadding: false, label: 'City', value: d => d.facility?.city },
    { columnName: 'gender', numeric: true, disablePadding: false, label: 'Gender', value: d => handleGenderColumn(d.gender) },
    { columnName: 'markAsMembersNeeded', numeric: true, disablePadding: false, label: 'Members are Needed?', value: d => d.markAsMembersNeeded ? 'true' : 'false' },
    { columnName: 'numberNeeded', numeric: true, disablePadding: false, label: '# Needed', value: d => d.numberNeeded ? d.numberNeeded : 0 },
    { columnName: 'boardChampion', numeric: true, disablePadding: false, label: 'Board Champion', value: d => d.boardChampion ? d.boardChampion?.firstName + ' ' + d.boardChampion?.lastName : 'empty' },
    { columnName: 'panelCoordinator', numeric: true, disablePadding: false, label: 'Panel Coordinator', value: d => d.panelCoordinator ? d.panelCoordinator?.firstName + ' ' + d.panelCoordinator?.lastName : 'empty' },
    { columnName: 'panelLeader', numeric: true, disablePadding: false, label: 'Panel Leader', value: d => d.panelLeader ? d.panelLeader?.firstName + ' ' + d.panelLeader?.lastName : 'empty' },
    { columnName: 'panelMember1', numeric: true, disablePadding: false, label: 'Panel Member 1', value: d => d.panelMember1 ? d.panelMember1?.firstName + ' ' + d.panelMember1?.lastName : 'empty' },
    { columnName: 'panelMember2', numeric: true, disablePadding: false, label: 'Panel Member 2', value: d => d.panelMember2 ? d.panelMember2?.firstName + ' ' + d.panelMember2?.lastName : 'empty' },
    { columnName: 'panelMember3', numeric: true, disablePadding: false, label: 'Panel Member 3', value: d => d.panelMember3 ? d.panelMember3?.firstName + ' ' + d.panelMember3?.lastName : 'empty' },
    { columnName: 'panelMember4', numeric: true, disablePadding: false, label: 'Panel Member 4', value: d => d.panelMember4 ? d.panelMember4?.firstName + ' ' + d.panelMember4?.lastName : 'empty' },
    { columnName: 'panelMember5', numeric: true, disablePadding: false, label: 'Panel Member 5', value: d => d.panelMember5 ? d.panelMember5?.firstName + ' ' + d.panelMember5?.lastName : 'empty' }
  ]
});

const PanelsDashboard = () => {
  const [isOpen, setisOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [panel, setPanel] = useState(null);
  const [facilities, setFacilties] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      id: '',
      dayOfWeek: '',
      weekOfMonth: '',
      eventTime: null,
      facility: null,
      gender: '',
      markAsMembersNeeded: false,
      numberNeeded: null,
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
          setisOpen(false);
        } else {
          await nchandiWebsiteService.postPanel({}, values);
          setisOpen(false);
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
    setisOpen(false);
  };

  /**
   *
   */
  const handleAdd = () => {
    formik.handleReset();
    setisOpen(true);
  };

  /**
   *
   */
  const handleSelection = (row) => {
    formik.setValues(row);
    setisOpen(true);
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
  const handleDelete = (e, entity) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
    setPanel(entity);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setPanel(null);
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
      setPanel(null);
      setIsDeleteDialogOpen(false);
      fetchTableData();
    }
  };

  const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete);

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
          <Grid sm={12}>
            <EnhancedTable
              data={tableData}
              {...tableConfig}
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
        primaryText={panel?.facility.name}
        secondaryText={panel?.weekOfMonth + ' - ' + panel?.dayOfWeek + ' at ' + panel?.eventTime}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default PanelsDashboard;