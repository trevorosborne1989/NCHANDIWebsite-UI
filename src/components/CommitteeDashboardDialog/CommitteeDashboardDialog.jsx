import * as React from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
} from '@mui/material';
import { Clear } from '@mui/icons-material';

const commitmentOptions = [
  {
    value: 'Chairperson',
    label: 'Chairperson',
  },
  {
    value: 'Associate Chairperson',
    label: 'Associate Chairperson',
  },
  {
    value: 'Facilities Chairperson',
    label: 'Facilities Chairperson',
  },
  {
    value: 'Facilities Associate Chairperson',
    label: 'Facilities Associate Chairperson',
  },
  {
    value: 'Treasurer',
    label: 'Treasurer',
  },
  {
    value: 'Associate Treasurer',
    label: 'Associate Treasurer',
  },
  {
    value: 'Secretary',
    label: 'Secretary',
  },
  {
    value: 'Librarian',
    label: 'Librarian',
  },
  {
    value: 'Website and Technology',
    label: 'Website and Technology',
  },
  {
    value: 'Policy & Guidelines',
    label: 'Policy & Guidelines',
  },
  {
    value: 'So Cal H&I Intergroup Liaison',
    label: 'So Cal H&I Intergroup Liaison',
  },
  {
    value: 'Spanish Liaison',
    label: 'Spanish Liaison',
  },
  {
    value: 'New Member Liaison',
    label: 'New Member Liaison',
  },
  {
    value: 'Board Champion',
    label: 'Board Champion',
  },
  {
    value: 'Panel Coordinator',
    label: 'Panel Coordinator',
  },
];

const CommitteeDashboardDialog = ({ formik, peopleData, isOpen, handleClear, handleSave, handleClose }) => {

  const handlePanelMemberChange = (e, panelMember) => {
    formik.setFieldValue(panelMember, peopleData.find(person => person.firstName + person.lastName === e.target.value));
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Committee Member</DialogTitle>
        <DialogContent>
          <DialogContentText pb={3}>
            Please fill out the committee information below.
          </DialogContentText>
          <Box display={'flex'}>
            <TextField
              select
              label='Committee Member'
              name='committeeMember'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values?.committeeMember ? formik.values?.committeeMember?.firstName + formik.values?.committeeMember?.lastName : ''}
              onChange={e => handlePanelMemberChange(e, 'committeeMember')}
              onBlur={formik.handleBlur}
              helperText={formik.touched.committeeMember ? formik.errors.committeeMember : ""}
              error={formik.touched.committeeMember && Boolean(formik.errors.committeeMember)}
            >
              {peopleData?.map(option => (
                <MenuItem key={option?.firstName + option?.lastName} value={option?.firstName + option?.lastName}>
                  {option?.firstName + ' ' + option?.lastName}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color='error' onClick={e => handleClear(e, 'committeeMember')} data-cy='modal-clear-panel-member1'>
              <Clear fontSize='large' />
            </IconButton>
          </Box>
          <TextField
            select
            label='H&I Commitment'
            name='commitment'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.commitment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.commitment ? formik.errors.commitment : ""}
            error={formik.touched.commitment && Boolean(formik.errors.commitment)}
            required
          >
            {commitmentOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='secondary' onClick={handleSave}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CommitteeDashboardDialog;