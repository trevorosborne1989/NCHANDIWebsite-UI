import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import { yupSchema } from './ValidationSchema';
import UploadCard from '../UploadCard/UploadCard';
import ShowUploadsCard from '../ShowUploadsCard/ShowUploadsCard';
// import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

// const nchandiWebsiteService = new NCHANDIWebsiteService();


// const generateTableConfig = (handleSelection, handleAdd, handleDelete) => ({
//   title: 'Panel Materials',
//   dataKey: d => d.id,
//   handleSelection: handleSelection,
//   toolbar: (
//     <IconButton color='primary' onClick={handleAdd} data-cy='table-add-button'>
//       <Add sx={{ color: nchandiTheme.handiGreen }} fontSize='large' />
//     </IconButton>
//   ),
//   columns: [
//     { columnName: '', numeric: true, disablePadding: false, label: '', value: d => <DeleteForever fontSize='large' color='error' onClick={e => handleDelete(e, d)} data-cy='table-delete-btn' /> },
//     { columnName: 'firstName', numeric: true, disablePadding: true, label: 'First Name', value: d => d.firstName }
//   ]
// });

function createData(id, label) {
  return {
    id,
    label,
  };
}

const panelMaterials = [
  createData('1', 'H&I Panel Guide'),
  createData('2', 'A Vision For You'),
  createData('3', '12x12'),
  createData('4', 'How It Works'),
  createData('5', 'Meeting Guide Instructions'),
  createData('6', '12 Traditions'),
  createData('7', 'Suggested Meeting Format'),
  createData('8', 'October Grapevine')
];

const PanelMaterialsPage = () => {
  const [listData, setListData] = useState(panelMaterials);
  const [panelMaterial, setPanelMaterial] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      resourceTitle: '',
      file: null
    },
    onSubmit: async (values) => {
      try {
        // await nchandiWebsiteService.postPanelMaterial({}, values);
        enqueueSnackbar('This resource was successfully uploaded.', snackbarMessages.success.configuration);
        formik.handleReset();
      } catch (err) {
        enqueueSnackbar('There was an error when uploading this resource, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
        console.error(err);
      }
    },
    validationSchema: yupSchema,
    validateOnBlur: true,
  });

  // const fetchData = useCallback(params => nchandiWebsiteService.getPanelMaterials(params), []); //Try This!!!

  /**
   *
   */
  const fetchListData = useCallback(async () => {
    try {
      // setLoading(true);
      // const { data: panelMaterials } = await nchandiWebsiteService.getPanelMaterials();
      setListData(panelMaterials);
    } catch (err) {
      enqueueSnackbar('Unable to fetch current panel materials, please try again later or contact the Technology Chair', snackbarMessages.error.configuration);
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, [enqueueSnackbar]);

  /**
   *
   */
  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

  /**
   *
   */
  const handleSave = () => {
    setTimeout( async () => { // Remove the onTimeout once the POST method in onSubmit is defined.
      formik.submitForm();
      if (formik.errors?.resourceTitle) {
        enqueueSnackbar('There are fields missing in your form. Please fill out all the required * fields.', snackbarMessages.error.configuration);
      }
      if (formik.errors?.file) {
        enqueueSnackbar(formik.errors?.file, snackbarMessages.error.configuration);
      };
      formik.setSubmitting(false);
    }, 5000);
  };

  /**
   *
   */
  const handleDelete = (e, entity) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
    setPanelMaterial(entity);
  };

  /**
   *
   */
  const handleDeleteDialogClose = () => {
    setPanelMaterial(null);
    setIsDeleteDialogOpen(false);
  };

  /**
   *
   */
  const handleDeleteDialogConfirm = async () => {
    // setLoading(true);
    try {
      // const { id } = panelMaterial;
      // await nchandiWebsiteService.deletePanelMaterialById(id);
      enqueueSnackbar('This resource was deleted.', snackbarMessages.success.configuration);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error deleting this resource!', snackbarMessages.error.configuration);
    } finally {
      // setLoading(false);
      setPanelMaterial(null);
      setIsDeleteDialogOpen(false);
      // fetchRequests();
    }
  };

  // const tableConfig = generateTableConfig(handleSelection, handleAdd, handleDelete);

  return (
    <>
      <Grid container sm={12} spacing={3} justifyContent={'center'}>
        <Grid sx={12} sm={6}>
          <UploadCard
            formik={formik}
            onSave={handleSave}
          />
        </Grid>
        <Grid sx={12} sm={6} >
          <ShowUploadsCard
            resourceData={listData}
            isOpen={isDeleteDialogOpen}
            entityName={'Panel Material'}
            cardTitle={'Panel Materials'}
            primaryText={panelMaterial?.label}
            handleClose={handleDeleteDialogClose}
            handleDelete={handleDelete}
            handleDeleteConfirm={handleDeleteDialogConfirm}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default PanelMaterialsPage;