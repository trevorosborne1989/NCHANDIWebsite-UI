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
    value: 'Panel Leader',
    label: 'Panel Leader',
  },
  {
    value: 'Panel Coordinator',
    label: 'Panel Coordinator',
  },
  {
    value: 'Board Member',
    label: 'Board Member',
  }
];

const PanelMaterialDialog = ({ formik, isOpen, handleSave, handleClose }) => {

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
            name='phoneNumber'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.phoneNumber ? formik.errors.phoneNumber : ""}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            required
          />
          <TextField
            select
            label='Contact Method'
            name='contactMethod'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.contactMethod}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.contactMethod ? formik.errors.contactMethod : ""}
            error={formik.touched.contactMethod && Boolean(formik.errors.contactMethod)}
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

export default PanelMaterialDialog;