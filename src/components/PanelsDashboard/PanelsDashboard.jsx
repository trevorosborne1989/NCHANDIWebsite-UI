import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, IconButton, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import PanelDashboardDialog from '../PanelsDashboardDialog/PanelsDashboardDialog'
import { yupSchema } from './ValidationSchema';
import TableConfig from './TableConfig';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

const facilities = [ // Remove once API is plugged in. This data from service works for dropdowns with javascript map() because service doesn't return a big javascript object. It returns a List of javascript objects.
  {
    name: "Freedom House",
    address: "432 1st Avenue",
    city: "Oceanside"
  },
  {
    name: "1st Step House",
    address: "2nd Street",
    city: "Carlsbad"
  },
  {
    name: "Tri-city",
    address: "Vista Way",
    city: "Vista"
  },
  {
    name: "New Beginnings",
    address: "1343 Fire Mountain Road",
    city: "Oceanside"
  },
  {
    name: "Aurora",
    address: "345 Winston Ave",
    city: "Carlsbad"
  },
  {
    name: "Interfaith Community Services",
    address: "550 W Washington Blvd",
    city: "Escondido"
  },
  {
    name: "VA Hospital",
    address: "3350 La Jolla Village Drive",
    city: "San Diego"
  },
];

function createData(id, dayOfWeek, weekOfMonth, time, facility, gender, membersAreNeeded, numberNeeded, boardChampion, panelCoordinator, panelLeader,
  panelMember1, panelMember2, panelMember3, panelMember4, panelMember5) {
    return {
    id,
    dayOfWeek,
    weekOfMonth,
    time,
    facility,
    gender,
    membersAreNeeded,
    numberNeeded,
    boardChampion,
    panelCoordinator,
    panelLeader,
    panelMember1,
    panelMember2,
    panelMember3,
    panelMember4,
    panelMember5
  };
}

const panels = [
createData("1","KACK","2","2:51 PM",facilities[0],"Female", false,"","Marsha","Cecile","Zora","Nelle","Christyna","Marcelia","Lynnette","Casi"),
createData("2","VVVH","4","6:43 AM",facilities[1],"Male", false,"","Etienne","Lydon","Buddy","Lonnard","Thor","Arri","Clywd","Nickolaus"),
createData("3","KGDV","3","12:35 AM",facilities[2],"Male", false,"","Gail","Yardley","Sandor","Julie","Bryant","William","Noak","Gearalt"),
createData("4","ZSCN","3","6:18 AM",facilities[3],"Male/Female", true,"5","Ricky","Courtney","Natal","Bradly","Cathe","Aggie","Sasha","Reina"),
createData("5","CFC4","2","2:51 PM",facilities[4],"Male", false,"","Gunther","Lefty","Freddie","Huey","Stanly","Mohandis","Beale","Cooper"),
createData("6","ZUWX","3","8:58 PM",facilities[5],"Male", false,"","Gene","Sim","Alejandro","Rurik","Ashlin","Abbe","Kristos","Noland"),
createData("7","ZYDQ","1","10:17 AM",facilities[6],"Female", true,"4","Reba","Lilyan","Ursola","Elsy","Remy","Peggi","Ania","Lenora"),
createData("8","SASO","1","11:43 PM",facilities[5],"Male", false,"","Quillan","Jakie","Wendel","Gregorio","Husein","Dore","Leigh","Garrard"),
createData("9","KOGS","2","11:08 AM",facilities[4],"Male", true,"3","Jory","Klement","Egbert","Brook","Herby","Arte","Elvyn","Sauncho"),
createData("10","VOCP","2","1:36 AM",facilities[3],"Female", true,"1","Christin","Josephine","Tessie","Wynn","Debbi","Oralee","Jacquenette","Silvia"),
createData("11","SSXD","4","7:19 AM",facilities[2],"Male/Female", false,"","Rozina","Audy","Deidre","Eimile","Kaela","Roselia","Delia","Cornela"),
createData("12","LTAU","4","7:23 AM",facilities[1],"Male", true,"5","Micah","Cristobal","Niles","Ricard","Abba","Simone","Langston","Nap"),
createData("13","KATY","4","1:09 PM",facilities[0],"Male/Female", true,"2","Amberly","Reyna","Roana","Kora","Deeyn","Siana","Mary","Idalina"),
createData("14","SOOG","3","9:55 PM",facilities[1],"Male", true,"5","Homerus","Jamison","Charlie","Rusty","Konrad","Darius","Leland","Gal"),
createData("15","ZGOW","3","4:31 PM",facilities[2],"Female", true,"4","Christian","Maure","Cornelle","Jeanna","Orly","Joannes","Bibby","Beryl"),
createData("16","YAMT","4","1:42 PM",facilities[3],"Male/Female", true,"3","Aggie","Tessa","Sharyl","Chrysler","Gillian","Lindsay","Anabel","Fionnula"),
createData("17","KLEM","3","6:42 PM",facilities[4],"Male/Female", false,"","Fionna","Fleurette","Cesya","Teddie","Aubrie","Doreen","Joleen","Lavinie"),
createData("18","NFCS","1","2:17 PM",facilities[5],"Male", false,"","Alvin","Hart","Kimble","Marcel","Eldredge","Clevey","Claudian","Ogdan"),
createData("19","LGSA","2","2:07 AM",facilities[6],"Female", true,"2","Chandra","Ingeberg","Koral","Raven","Deborah","Illa","Jodee","Marj"),
createData("20","SKVV","4","5:28 PM",facilities[5],"Male", false,"","Neel","Iorgo","Skye","Read","Ashby","Bartholomeus","Kerry","Padgett")
];

const PanelsDashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  // const [facilities, setFacilties] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      id: '',
      dayOfWeek: '',
      weekOfMonth: '',
      time: '',
      facility: null,
      gender: '',
      membersAreNeeded: false,
      numberNeeded: '',
      boardChampion: '',
      panelCoordinator: '',
      panelLeader: '',
      panelMember1: '',
      panelMember2: '',
      panelMember3: '',
      panelMember4: '',
      panelMember5: ''
    },
    onSubmit: async (values) => {
      const { id } = values;
      try {

        if (id) {
          // await ectsService.putEctsstaffWithEctsStaffId({}, id, values);
          setDialogOpen(false);
        }else {
          // await ectsService.postEctsstaff({}, values);
          setDialogOpen(false);
        }
        enqueueSnackbar('This panel was successfully submitted.', snackbarMessages.success.configuration);
      } catch (err) {
        enqueueSnackbar('There was an error when submitting this form, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  // const fetchData = useCallback(params => ectsService.getEctsstaff(params), []); //Try This!!!

  const fetchTableData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: panels } = await nchandiWebsiteService.getPanels();
      setTableData(panels);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const fetchFacilityData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: facilities } = await nchandiWebsiteService.getFacilities();
      // setFacilties(facilities);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFacilityData();
  }, [fetchFacilityData]);

  const handleDialogSave = () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (!formik.isValid) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all the required * fields.', snackbarMessages.error.configuration);
      }
      formik.setSubmitting(false);
    }, 1000);
  };

  const handleDialogClose = () => {
    formik.handleReset();
    setDialogOpen(false);
  };

  const handleNew = () => {
    formik.handleReset();
    setDialogOpen(true);
  };

  const handleRowSelection = (row) => {
    formik.setValues(row);
    setDialogOpen(true);
  };

  return (
    <>
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} py={3} pb={3}>
        <Grid sm={10}>
          <Typography variant="h4" color={'white'} >
            Panels Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Grid container sm={12} justifyContent={'center'} pb={5}>
        <Grid sm={8}>
          <Divider sx={{background: 'white'}} />
        </Grid>
      </Grid>
      <Box display='flex' alignItems='center' justifyContent='flex-end'>
        <IconButton
          color='primary'
          onClick={handleNew}
          data-cy='committee-dashboard-add-button'
        >
          <Add sx={{ color: 'white' }} fontSize='large' />
        </IconButton>
      </Box>
      <Grid container sm={12} justifyContent={'center'}>
        <Grid sm={12}>
          <EnhancedTable
            data ={tableData}
            handleSelection={handleRowSelection}
            {...TableConfig}
          />
        </Grid>
      </Grid>
      <PanelDashboardDialog
        formik={formik}
        facilityData={facilities}
        isOpen={dialogOpen}
        handleSave={handleDialogSave}
        handleClose={handleDialogClose}
      />
    </>
  )
}

export default PanelsDashboard;