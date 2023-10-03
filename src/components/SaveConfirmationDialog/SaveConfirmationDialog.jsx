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

const SaveConfirmationDialog = ({
  isOpen,
  entityName,
  primaryText,
  secondaryText,
  handleClose,
  handleSave
}) => (
  <Dialog open={isOpen} onClose={handleClose} fullWidth>
    <DialogTitle>Confirmation</DialogTitle>
    <DialogContent>
      {entityName
        ? <Typography>You are about to confirm the following {entityName}:</Typography>
        : <Typography>You are about to confirm the following:</Typography>}
      <List dense>
        <ListItem data-cy='save-entity-list'>
          <ListItemText primary={primaryText} secondary={secondaryText} />
        </ListItem>
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} data-cy='save-entity-cancel'>Cancel</Button>
      <Button variant='contained' color='secondary' onClick={handleSave} data-cy='save-entity-confirm'>Confirm</Button>
    </DialogActions>
  </Dialog>
);

SaveConfirmationDialog.propTypes = {
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
   * Function handler for on save
   */
  handleSave: PropTypes.func
};

export default SaveConfirmationDialog;
