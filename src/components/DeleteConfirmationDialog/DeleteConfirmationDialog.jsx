import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    Typography,
    DialogTitle
  } from '@mui/material';
import PropTypes from 'prop-types';

const DeleteConfirmationDialog = ({
  isOpen,
  entityName,
  primaryText,
  secondaryText,
  handleClose,
  handleDelete
}) => (
  <Dialog open={isOpen} onClose={handleClose} fullWidth>
    <DialogTitle>Delete Confirmation</DialogTitle>
    <DialogContent>
      {entityName
        ? <Typography>You are about to delete the following {entityName}:</Typography>
        : <Typography>You are about to delete the following:</Typography>}
      <List dense>
        <ListItem data-cy='delete-entity-list'>
          <ListItemText primary={primaryText} secondary={secondaryText} />
        </ListItem>
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} data-cy='delete-entity-cancel'>Cancel</Button>
      <Button variant='contained' color='secondary' onClick={handleSave} data-cy='delete-entity-confirm'>Submit</Button>
    </DialogActions>
  </Dialog>
);

DeleteConfirmationDialog.propTypes = {
  /**
   * Boolean value reprenting open and close state of the dialog
   */
  isOpen: PropTypes.bool,
  /**
   * String value for the entity being deleted
   */
  entityName: PropTypes.string,
  /**
   * Primary text in the delete dialog
   */
  primaryText: PropTypes.string,
  /**
   * Secondary text the delete dialog
   */
  secondaryText: PropTypes.string,
  /**
   * Function handler for on close
   */
  handleClose: PropTypes.func,
  /**
   * Function handler for on delete
   */
  handleDelete: PropTypes.func
};

export default DeleteConfirmationDialog;
