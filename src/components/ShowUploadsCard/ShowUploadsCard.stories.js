import React, { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages.json';
import ShowUploadsCard from './ShowUploadsCard';

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

export default {
    title: 'ShowUploadsCard',
    component: ShowUploadsCard,
  };

export const Primary = ({...props}) => {
  const [listData, setListData] = useState(panelMaterials);
  const [panelMaterial, setPanelMaterial] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

  return (
    <>
      <ShowUploadsCard
        resourceData={listData}
        isOpen={isDeleteDialogOpen}
        entityName={'Panel Material'}
        primaryText={panelMaterial?.label}
        handleClose={handleDeleteDialogClose}
        handleDelete={handleDelete}
        handleDeleteConfirm={handleDeleteDialogConfirm}
      />
    </>
  );
};