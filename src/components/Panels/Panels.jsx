import React, { useState, useCallback, useEffect } from "react";
import { Typography, Divider } from "@mui/material";
import EnhancedTable from "../EnhancedTable/EnhancedTable";
import Grid from '@mui/material/Unstable_Grid2';
import PanelsDialog from "../PanelsDialog/PanelsDialog";
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import { yupSchema } from './ValidationSchema';
import TableConfig from "./TableConfig";

function createData(id, dayOfWeek, weekOfMonth, time, facility, gender, numberNeeded) {
  return {
    id,
    dayOfWeek,
    weekOfMonth,
    time,
    facility,
    gender,
    numberNeeded,
  };
}

const panels = [
  createData('1', 'Tuesday', 1, '7:00 AM', 'First Step House', 'Male', 5),
  createData('2','Friday', 3, '8:00 AM', 'First Step House', 'Female', 1),
  createData('3','Wednesday', 2, '7:00 PM', 'Tri-City', 'Male/Female', 4),
  createData('4','Saturday', 1, '5:00 PM', 'First Step House', 'Female', 5),
  createData('5','Thrsday', 1, '10:00 AM', 'Crown View', 'Male', 2),
  createData('6','Monday', 3, '7:00 PM', 'Sober Recovery', 'Male', 3),
  createData('7','Wednesday', 3, '7:00 AM', 'Recovered Sisters', 'Female', 3),
  createData('8','Friday', 2, '7:00 AM', 'First Step House', 'Male', 5),
  createData('9','Tuesday', 4, '5:00 PM', 'Tri-City', 'Male', 4),
  createData('10','Saturday', 5, '10:00 AM', 'Sober Recovery', 'Male', 1),
  createData('11','Friday', 1, '12:30 PM', 'First Step House', 'Male', 2),
  createData('12','Monday', 2, '4:00 PM', 'Tri-City', 'Female', 1),
  createData('13','Wednsesday', 3, '9:00 AM', 'Crown View', 'Male/Female', 3),
  createData('14','Thursday', 1, '10:00 AM', 'Carlsbad Recovery', 'Male', 1),
  createData('15','Sunday', 4, '12:00 PM', 'Recovered Sisters', 'Female', 5),
  createData('16','Saturday', 2, '8:00 AM', 'Carlsbad Recovery', 'Male', 4)
];

const Panels = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [facilityData, setFacilityData] = useState('');
  const [tableData, setTableData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      commitment: '',
      email: '',
      phoneNumber: '',
      contactMethod: ''
    },
    onSubmit: async () => {
      try {
        // await post method()   Use await here.
        enqueueSnackbar('This volunteer request was successfully submitted.', snackbarMessages.success.configuration);
        handleDialogClose();
      } catch (err) {
        enqueueSnackbar('There was an error when submitting this form, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  const fetchPanelData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: committeeMembers } = await nchandiWebsiteService.getCommitteeMembers();
      setTableData(panels);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPanelData();
  }, [fetchPanelData]);

  const handleDialogSave = () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all required * fields.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
    }, 1000);
  };

  const handleDialogClose = () => {
    formik.handleReset();
    setDialogOpen(false);
  };

  const handleRowSelection = (row) => {
    setFacilityData(row);
    setDialogOpen(true);
  };

  return (
    <>
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
            handleSelection={handleRowSelection}
            {...TableConfig}
          />
        </Grid>
      </Grid>
      <PanelsDialog
        formik={formik}
        data={facilityData}
        isOpen={dialogOpen}
        handleSave={handleDialogSave}
        handleClose={handleDialogClose}
      />
    </>
  )
}

export default Panels;