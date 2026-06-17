import React, { useState, useCallback, useEffect } from "react";
import {
  Typography,
  Divider,
  Skeleton,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Wc,
  Man,
  Woman,
  FileDownloadOutlined,
} from '@mui/icons-material';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import Grid from '@mui/material/Unstable_Grid2';
import PanelsDialog from "../PanelsDialog/PanelsDialog";
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { CSVLink } from 'react-csv';
import { yupSchema } from './ValidationSchema';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'
import { nchandiTheme, nchandiTableStyles } from '../../App';

const nchandiWebsiteService = new NCHANDIWebsiteService();

const generateTableConfig = (handleSelection, handleGenderColumn, tableData) => ({
  onRowSelectionModelChange: handleSelection,
  slots: {
    toolbar: () => {
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
        </GridToolbarContainer>
      )
    },
    noRowsOverlay: () => {
      return (
        <>
          <Box textAlign={'center'}>
            <Typography variant="h7" color={nchandiTheme.handiDarkYellow} textAlign={'center'} pt={2}>
              No rows
            </Typography>
          </Box>
          <Box>
          <Typography variant="h4"  textAlign={'center'} pt={5}>
            Please contact facilities@nchandi.org for the most updated panel needs.
          </Typography>
          </Box>
        </>
      )
    }
  },
  columns: [
    { field: 'id', headerName: 'ID', width: 100, visible: false },
    { field: 'dayOfWeek', headerName: 'Day', width: 100 },
    { field: 'weekOfMonth', headerName: 'Week',  width: 75 },
    { field: 'eventTime', headerName: 'Time',  width: 100 },
    { field: 'facility', headerName: 'Facility',  width: 250, valueGetter: (value, row) => row?.facility?.name },
    { field: 'gender', headerName: 'Gender', width: 75, renderCell: (params) => (handleGenderColumn(params?.row)) },
    { field: 'numberNeeded', headerName: '# Needed',  width: 100 },
    { field: 'address', headerName: 'Address',  width: 175, valueGetter: (value, row) => row?.facility?.address },
    { field: 'city', headerName: 'City',  width: 100, valueGetter: (value, row) => row?.facility?.city },
    { field: 'website', headerName: 'Website',  width: 250, valueGetter: (value, row) => row?.facility?.website }
  ]
});

const exportHeaders = [
  { label: "Day", key: "dayOfWeek" },
  { label: "Week", key: "weekOfMonth" }, // Dot notation handles the nesting
  { label: "Time", key: "eventTime" },
  { label: "Facility", key: "facility.name" },
  { label: "Gender", key: "gender" },
  { label: "# Needed", key: "numberNeeded" },
  { label: "Address", key: "facility.address" },
  { label: "City", key: "facility.city" },
  { label: "Website", key: "facility.website" }
];

const Panels = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [panel, setPanel] = useState('');
  const [tableData, setTableData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredContactMethod: '',
      commitment: 'Panel Member'
    },
    onSubmit: async (values) => {
      try {
        await nchandiWebsiteService.savePending({}, values);
        enqueueSnackbar('Your volunteer request was successfully submitted. Our facilities chair will contact you.', snackbarMessages.success.configuration);
        handleDialogClose();
      } catch (err) {
        enqueueSnackbar('There was an error when submitting this form, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  const fetchTableData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: panels } = await nchandiWebsiteService.getOpenPanels();
      setTableData(panels);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

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

  const handleDialogSave = () => {
    formik.setFieldValue('panelId', panel.id);
    formik.setFieldValue('facilityName', panel?.facility?.name);
    formik.setFieldValue('numberNeeded', panel.numberNeeded);
    formik.setFieldValue('dayOfWeek', panel.dayOfWeek);
    formik.setFieldValue('weekOfMonth', panel.weekOfMonth);
    formik.setFieldValue('eventTime', panel.eventTime);
    formik.setFieldValue('gender', panel.gender);
    formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all the required fields.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
  };

  const handleDialogClose = () => {
    formik.handleReset();
    setDialogOpen(false);
  };

  const handleSelection = (id) => {
    if (id.length !== 0) {
    setPanel((tableData.filter(row => row?.id === id[0]))[0]);
    setDialogOpen(true);
    }
  };

  const tableConfig = generateTableConfig(handleSelection, handleGenderColumn, tableData);

  return (
    <Box ml={2} mr={2}>
      <Grid container sm={12} textAlign={'center'} justifyContent={'center'} py={3} pb={7}>
        <Grid sm={10}>
          <Typography variant="h3" color={'white'} >
            Panels
          </Typography>
        </Grid>
      </Grid>
      <Grid container sm={12} justifyContent={'center'} pb={7}>
        <Grid sm={10}>
          <Divider sx={{background: 'white'}} />
        </Grid>
      </Grid>
      <Grid container  sm={12} justifyContent={'center'} pb={7}>
        { loading ?
          <Skeleton variant='rectangular' width='90%' height={500} />
          :
          <Grid sm={11} height={500} width={'100%'}>
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
      <PanelsDialog
        formik={formik}
        data={panel}
        isOpen={dialogOpen}
        handleSave={handleDialogSave}
        handleClose={handleDialogClose}
      />
    </Box>
  )
}

export default Panels;