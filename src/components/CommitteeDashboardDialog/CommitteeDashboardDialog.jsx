import * as React from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

const contactOptions = [
  {
    value: 'None',
    label: 'None'
  },
  {
    value: 'Text',
    label: 'Text'
  },
  {
    value: 'Email',
    label: 'Email'
  }
];
const commitmentOptions = [
  {
    value: 'Chair',
    label: 'Chair',
  },
  {
    value: 'CoChair',
    label: 'CoChair',
  },
  {
    value: 'Librarian',
    label: 'Librarian',
  },
  {
    value: 'Technology',
    label: 'Technology',
  },
  {
    value: 'Treasurer',
    label: 'Treasurer',
  },
  {
    value: 'Facilities',
    label: 'Facilities',
  }
];

const CommitteeDashboardDialog = ({ formik, isOpen, handleSave, handleClose }) => {

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Committee Member</DialogTitle>
        <DialogContent>
          <DialogContentText pb={3}>
            Please fill out the committee information below.
          </DialogContentText>
          <TextField
            label='First Name'
            name='firstName'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.firstName ? formik.errors.firstName : ""}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            required
          />
          <TextField
            label='Last Name'
            name='lastName'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.lastName ? formik.errors.lastName : ""}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            required
          />
          <TextField
            label='Email'
            name='email'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email ? formik.errors.email : ""}
            error={formik.touched.email && Boolean(formik.errors.email)}
            required
          />
          <TextField
            label='Phone Number'
            name='phone'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.phone ? formik.errors.phone : ""}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            required
          />
          <TextField
            select
            label='Preferred Contact Method'
            name='preferredContactMethod'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.preferredContactMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.preferredContactMethod ? formik.errors.preferredContactMethod : ""}
            error={formik.touched.preferredContactMethod && Boolean(formik.errors.preferredContactMethod)}
            required
          >
            {contactOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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