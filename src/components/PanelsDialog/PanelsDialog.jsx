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

const PanelsDialog = ({ formik, data, isOpen, handleSave, handleClose }) => {

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Volunteer</DialogTitle>
        <DialogContent>
          <DialogContentText pb={3}>
            Please fill out the volunteer information below.
          </DialogContentText>
          {data && <DialogContentText pb={5}> {data.dayOfWeek + '     -     ' + data.weekOfMonth + '     -    ' + data.eventTime + '     -     ' + data.facility?.name} </DialogContentText>}
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
            label='Phone'
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='secondary' onClick={handleSave}>Volunteer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PanelsDialog;