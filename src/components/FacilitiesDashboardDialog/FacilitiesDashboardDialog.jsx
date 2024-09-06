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
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  }
];

const FacilitiesDashboardDialog = ({ formik, isOpen, handleSave, handleClose }) => {

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Facility</DialogTitle>
        <DialogContent>
          <DialogContentText pb={3}>
            Please fill out the facility information below.
          </DialogContentText>
          <TextField
            label='Name'
            name='name'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.name ? formik.errors.name : ""}
            error={formik.touched.name && Boolean(formik.errors.name)}
            required
          />
          <TextField
            select
            label='Type'
            name='type'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.type ? formik.errors.type : ""}
            error={formik.touched.type && Boolean(formik.errors.type)}
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
            label='State'
            name='state'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.state ? formik.errors.state : ""}
            error={formik.touched.state && Boolean(formik.errors.state)}
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
          <Grid Grid container sm={12} pt={4}>
            <Grid sm={5}>
              <TextField
                label='Primary Contact Name'
                name='primaryContactName'
                fullWidth
                variant='outlined'
                size='small'
                margin='dense'
                value={formik.values.primaryContactName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.primaryContactName ? formik.errors.primaryContactName : ""}
                error={formik.touched.primaryContactName && Boolean(formik.errors.primaryContactName)}
                required
              />
            </Grid>
            <Grid sm={5} pt={1} pl={3}>
              <PhoneInput
                  country="US"
                  disableDropdown
                  value={formik.values.primaryContactPhone}
                  onChange={value => formik.setFieldValue('primaryContactPhone', value)}
                  isValid={() => {
                    if (formik.touched.primaryContactPhone && Boolean(formik.errors.primaryContactPhone)) {
                      return 'Invalid phone number';
                    } else {
                      return true;
                    }
                  }}
              />
            </Grid>
          </Grid>
          <Box textAlign={'center'} pt={1}>
            <TextField
              label='Primary Contact Email'
              name='primaryContactEmail'
              variant='outlined'
              fullWidth
              size='small'
              margin='dense'
              value={formik.values.primaryContactEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.primaryContactEmail ? formik.errors.primaryContactEmail : ""}
              error={formik.touched.primaryContactEmail && Boolean(formik.errors.primaryContactEmail)}
              required
            />
          </Box>
          <Grid Grid container sm={12} pt={4}>
            <Grid sm={5}>
              <TextField
                label='Alternate Contact Name'
                name='alternateContactName'
                fullWidth
                variant='outlined'
                size='small'
                margin='dense'
                value={formik.values.alternateContactName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.alternateContactName ? formik.errors.alternateContactName : ""}
                error={formik.touched.alternateContactName && Boolean(formik.errors.alternateContactName)}
                required
              />
            </Grid>
            <Grid sm={5} pt={1} pl={3}>
              <PhoneInput
                country="US"
                disableDropdown
                value={formik.values.alternateContactPhone}
                onChange={value => formik.setFieldValue('alternateContactPhone', value)}
                isValid={() => {
                  if (formik.touched.alternateContactPhone && Boolean(formik.errors.alternateContactPhone)) {
                    return 'Invalid phone number';
                  } else {
                    return true;
                  }
                }}
              />
            </Grid>
          </Grid>
          <Box textAlign={'center'} pt={1} pb={4}>
            <TextField
              label='Alternate Contact Email'
              name='alternateContactEmail'
              fullWidth
              variant='outlined'
              size='small'
              margin='dense'
              value={formik.values.alternateContactEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.alternateContactEmail ? formik.errors.alternateContactEmail : ""}
              error={formik.touched.alternateContactEmail && Boolean(formik.errors.alternateContactEmail)}
              required
            />
          </Box>
          <Box pl={10} pr={10}>
            <TextField
              select
              label='Active'
              name='active'
              fullWidth
              variant='outlined'
              size='small'
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='secondary' onClick={handleSave}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FacilitiesDashboardDialog;