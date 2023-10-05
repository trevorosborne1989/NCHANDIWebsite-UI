import React, { useState, useEffect, useCallback } from 'react';
import { Divider, Typography, IconButton } from '@mui/material';
import { Add, DeleteForever } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import EnhancedTable from '../EnhancedTable/EnhancedTable';
import PanelDashboardDialog from '../PanelsDashboardDialog/PanelsDashboardDialog'
import DeleteConfirmationDialog from '../DeleteConfirmationDialog/DeleteConfirmationDialog';
import { yupSchema } from './ValidationSchema';
import { nchandiTheme } from '../../App';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();

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
    { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <DeleteForever fontSize='large'  color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /> },
    { columnName: 'dayOfWeek', numeric: true, disablePadding: false, label: 'Day of Week', value: d => d.dayOfWeek },
    { columnName: 'weekOfMonth', numeric: true, disablePadding: true, label: 'Week of Month', value: d => d.weekOfMonth },
    { columnName: 'time', numeric: true, disablePadding: false, label: 'Time', value: d => d.time },
    { columnName: 'facility', numeric: true, disablePadding: false, label: 'Facility', value: d => d.facility.name },
    { columnName: 'address', numeric: true, disablePadding: false, label: 'Address', value: d => d.facility.address },
    { columnName: 'city', numeric: true, disablePadding: false, label: 'City', value: d => d.facility.city },
    { columnName: 'gender', numeric: true, disablePadding: false, label: 'Gender', value: d => d.gender },
    { columnName: 'membersAreNeeded', numeric: true, disablePadding: false, label: 'Members are Needed?', value: d => d.membersAreNeeded ? 'true' : 'false' },
    { columnName: 'numberNeeded', numeric: true, disablePadding: false, label: '# Needed', value: d => d.numberNeeded },
    { columnName: 'boardChampion', numeric: true, disablePadding: false, label: 'Board Champion', value: d => d.boardChampion },
    { columnName: 'panelCoordinator', numeric: true, disablePadding: false, label: 'Panel Coordinator', value: d => d.panelCoordinator },
    { columnName: 'panelLeader', numeric: true, disablePadding: false, label: 'Panel Leader', value: d => d.panelLeader },
    { columnName: 'panelMember1', numeric: true, disablePadding: false, label: 'Panel Member 1', value: d => d.panelMember1 },
    { columnName: 'panelMember2', numeric: true, disablePadding: false, label: 'Panel Member 2', value: d => d.panelMember2 },
    { columnName: 'panelMember3', numeric: true, disablePadding: false, label: 'Panel Member 3', value: d => d.panelMember3 },
    { columnName: 'panelMember4', numeric: true, disablePadding: false, label: 'Panel Member 4', value: d => d.panelMember4 },
    { columnName: 'panelMember5', numeric: true, disablePadding: false, label: 'Panel Member 5', value: d => d.panelMember5 }
  ]
});

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
createData("1","KACK","2","2:51 PM",facilities[0],"Female", false,"0","Marsha","Cecile","Zora","Nelle","Christyna","Marcelia","Lynnette","Casi"),
createData("2","VVVH","4","6:43 AM",facilities[1],"Male", false,"0","Etienne","Lydon","Buddy","Lonnard","Thor","Arri","Clywd","Nickolaus"),
createData("3","KGDV","3","12:35 AM",facilities[2],"Male", false,"0","Gail","Yardley","Sandor","Julie","Bryant","William","Noak","Gearalt"),
createData("4","ZSCN","3","6:18 AM",facilities[3],"Male/Female", true,"5","Ricky","Courtney","Natal","Bradly","Cathe","Aggie","Sasha","Reina"),
createData("5","CFC4","2","2:51 PM",facilities[4],"Male", false,"0","Gunther","Lefty","Freddie","Huey","Stanly","Mohandis","Beale","Cooper"),
createData("6","ZUWX","3","8:58 PM",facilities[5],"Male", false,"0","Gene","Sim","Alejandro","Rurik","Ashlin","Abbe","Kristos","Noland"),
createData("7","ZYDQ","1","10:17 AM",facilities[6],"Female", true,"4","Reba","Lilyan","Ursola","Elsy","Remy","Peggi","Ania","Lenora"),
createData("8","SASO","1","11:43 PM",facilities[5],"Male", false,"0","Quillan","Jakie","Wendel","Gregorio","Husein","Dore","Leigh","Garrard"),
createData("9","KOGS","2","11:08 AM",facilities[4],"Male", true,"3","Jory","Klement","Egbert","Brook","Herby","Arte","Elvyn","Sauncho"),
createData("10","VOCP","2","1:36 AM",facilities[3],"Female", true,"1","Christin","Josephine","Tessie","Wynn","Debbi","Oralee","Jacquenette","Silvia"),
createData("11","SSXD","4","7:19 AM",facilities[2],"Male/Female", false,"0","Rozina","Audy","Deidre","Eimile","Kaela","Roselia","Delia","Cornela"),
createData("12","LTAU","4","7:23 AM",facilities[1],"Male", true,"5","Micah","Cristobal","Niles","Ricard","Abba","Simone","Langston","Nap"),
createData("13","KATY","4","1:09 PM",facilities[0],"Male/Female", true,"2","Amberly","Reyna","Roana","Kora","Deeyn","Siana","Mary","Idalina"),
createData("14","SOOG","3","9:55 PM",facilities[1],"Male", true,"5","Homerus","Jamison","Charlie","Rusty","Konrad","Darius","Leland","Gal"),
createData("15","ZGOW","3","4:31 PM",facilities[2],"Female", true,"4","Christian","Maure","Cornelle","Jeanna","Orly","Joannes","Bibby","Beryl"),
createData("16","YAMT","4","1:42 PM",facilities[3],"Male/Female", true,"3","Aggie","Tessa","Sharyl","Chrysler","Gillian","Lindsay","Anabel","Fionnula"),
createData("17","KLEM","3","6:42 PM",facilities[4],"Male/Female", false,"0","Fionna","Fleurette","Cesya","Teddie","Aubrie","Doreen","Joleen","Lavinie"),
createData("18","NFCS","1","2:17 PM",facilities[5],"Male", false,"0","Alvin","Hart","Kimble","Marcel","Eldredge","Clevey","Claudian","Ogdan"),
createData("19","LGSA","2","2:07 AM",facilities[6],"Female", true,"2","Chandra","Ingeberg","Koral","Raven","Deborah","Illa","Jodee","Marj"),
createData("20","SKVV","4","5:28 PM",facilities[5],"Male", false,"0","Neel","Iorgo","Skye","Read","Ashby","Bartholomeus","Kerry","Padgett")
];

const PanelsDashboard = () => {
  const [isOpen, setisOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [panel, setPanel] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
      numberNeeded: 0,
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
          setisOpen(false);
        }else {
          // await ectsService.postEctsstaff({}, values);
          setisOpen(false);
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

  /**
   *
   */
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
      // setLoading(true);
      // const { data: facilities } = await nchandiWebsiteService.getFacilities();
      // setFacilties(facilities);
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
    fetchFacilityData();
  }, [fetchFacilityData]);

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
   const handleDelete = (e, id) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
    setPanel(id);
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
    // setLoading(true);
    try {
      // const { id } = panelMember;
      // await nchandiWebsiteService.deletePanelById(id);
      enqueueSnackbar('This panel was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting the panel!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setPanel(null);
      setIsDeleteDialogOpen(false);
      // fetchRequests();
    }
  };

  const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete);
  
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
      <Grid container sm={12} justifyContent={'center'}>
        <Grid sm={12}>
          <EnhancedTable
            data ={tableData}
            {...tableConfig}
          />
        </Grid>
      </Grid>
      <PanelDashboardDialog
        formik={formik}
        facilityData={facilities}
        isOpen={isOpen}
        handleSave={handleSave}
        handleClose={handleClose}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        entityName='Panel'
        primaryText={panel?.facility.name}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDeleteDialogConfirm}
      />
    </>
  )
}

export default PanelsDashboard;