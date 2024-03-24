import React, { useState, useCallback, useEffect } from "react";
import { Typography, Divider } from "@mui/material";
import EnhancedTable from "../EnhancedTable/EnhancedTable";
import Grid from '@mui/material/Unstable_Grid2';
import PanelsDialog from "../PanelsDialog/PanelsDialog";
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { yupSchema } from './ValidationSchema';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const generateTableConfig = (handleSelection) => ({
  tableTitle: 'Open Panels',
  dataKey: d => d.id,
  handleSelection: handleSelection,
  columns: [
    { columnName: 'dayOfWeek', numeric: true, disablePadding: false, label: 'Day of Week', value: d => d.dayOfWeek },
    { columnName: 'weekOfMonth', numeric: true, disablePadding: false, label: 'Week of Month', value: d => d.weekOfMonth },
    { columnName: 'eventTime', numeric: false, disablePadding: false, label: 'Time', value: d => d.eventTime },
    { columnName: 'facility', numeric: true, disablePadding: false, label: 'Facility', value: d => d.facility?.name },
    { columnName: 'gender', numeric: true, disablePadding: false, label: 'Gender', value: d => d.gender },
    { columnName: 'numberNeeded', numeric: true, disablePadding: false, label: '# Needed', value: d => d.numberNeeded},
    { columnName: 'address', numeric: true, disablePadding: false, label: 'Address', value: d => d.facility?.address },
    { columnName: 'city', numeric: true, disablePadding: false, label: 'City', value: d => d.facility?.city },
    { columnName: 'website', numeric: true, disablePadding: false, label: 'Website', value: d => d.facility?.website }
  ]
});

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
      const { data: panels } = await nchandiWebsiteService.getPanels();
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

  const handleSelection = (row) => {
    setPanel(row);
    setDialogOpen(true);
  };

  const tableConfig = generateTableConfig(handleSelection);

  return (
    <>
    {loading}
    {console.log(tableData)}
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
        <Grid sm={11}>
          <EnhancedTable
            data={tableData}
            {...tableConfig}
          />
        </Grid>
      </Grid>
      <PanelsDialog
        formik={formik}
        data={panel}
        isOpen={dialogOpen}
        handleSave={handleDialogSave}
        handleClose={handleDialogClose}
      />
    </>
  )
}

export default Panels;