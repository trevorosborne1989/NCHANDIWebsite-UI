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
import RequestsDashboard from '../RequestsDashboard/RequestsDashboard';

const facilityOptions = [
  {
    value: 'Treatment',
    label: 'Treatment'
  },
  {
    value: 'Correctional',
    label: 'Correctional'
  }
];
const activeOptions = [
  {
    value: 'Yes',
    label: 'Yes',
  },
  {
    value: 'No',
    label: 'No',
  }
];

const RequestsDashboardDialog = ({ formik, isOpen, handleSave, handleClose }) => {

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Facility</DialogTitle>
        <DialogContent>
          <DialogContentText pb={3}>
            Please fill out the facility information below.
          </DialogContentText>
          <TextField
            label='Facility Name'
            name='facilityName'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.facilityName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.facilityName ? formik.errors.facilityName : ""}
            error={formik.touched.facilityName && Boolean(formik.errors.facilityName)}
            required
          />
          <TextField
            select
            label='Facility Type'
            name='facilityType'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.facilityType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.facilityType ? formik.errors.facilityType : ""}
            error={formik.touched.facilityType && Boolean(formik.errors.facilityType)}
            required
          >
          {facilityOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          <TextField
            label='Address'
            name='address'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.address ? formik.errors.address : ""}
            error={formik.touched.address && Boolean(formik.errors.address)}
            required
          />
          <TextField
            label='City'
            name='city'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.city ? formik.errors.city : ""}
            error={formik.touched.city && Boolean(formik.errors.city)}
            required
          />
          <TextField
            label='Website'
            name='website'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.website ? formik.errors.website : ""}
            error={formik.touched.website && Boolean(formik.errors.website)}
            required
          />
          <TextField
            label='Primary Contact Name'
            name='primaryContactName'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.primaryContactName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.primaryContactName ? formik.errors.primaryContactName : ""}
            error={formik.touched.primaryContactName && Boolean(formik.errors.primaryContactName)}
            required
          />
          <TextField
            label='Primary Contact Email'
            name='primaryContactEmail'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.primaryContactEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.primaryContactEmail ? formik.errors.primaryContactEmail : ""}
            error={formik.touched.primaryContactEmail && Boolean(formik.errors.primaryContactEmail)}
            required
          />
          <TextField
            label='Primary Phone Number'
            name='primaryPhoneNumber'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.primaryPhoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.primaryPhoneNumber ? formik.errors.primaryPhoneNumber : ""}
            error={formik.touched.primaryPhoneNumber && Boolean(formik.errors.primaryPhoneNumber)}
            required
          />
          <TextField
            label='Alternate Contact Name'
            name='altContactName'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.altContactName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.altContactName ? formik.errors.altContactName : ""}
            error={formik.touched.altContactName && Boolean(formik.errors.altContactName)}
            required
          />
          <TextField
            label='Alternate Contact Email'
            name='altContactEmail'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.altContactEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.altContactEmail ? formik.errors.altContactEmail : ""}
            error={formik.touched.altContactEmail && Boolean(formik.errors.altContactEmail)}
            required
          />
          <TextField
            label='Alternate Phone Number'
            name='altPhoneNumber'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.altPhoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.altPhoneNumber ? formik.errors.altPhoneNumber : ""}
            error={formik.touched.altPhoneNumber && Boolean(formik.errors.altPhoneNumber)}
            required
          />
          <TextField
            select
            label='Active'
            name='active'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.active}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.active ? formik.errors.active : ""}
            error={formik.touched.active && Boolean(formik.errors.active)}
            required
          >
          {activeOptions.map(option => (
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

export default RequestsDashboardDialog;