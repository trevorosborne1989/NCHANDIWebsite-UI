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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { nchandiTheme } from '../../App';

const genderOptions =[
  {
    value: 'Male',
    label: 'Male'
  },
  {
    value: 'Female',
    label: 'Female'
  },
  {
    value: 'Male/Female',
    label: 'Male/Female'
  },
]

const PanelMembersDashboardDialog = ({ formik, facilityData, isOpen, handleSave, handleClose }) => {

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Panel</DialogTitle>
        <DialogContent>
          <DialogContentText pb={3}>
            Please fill out the panel information below.
          </DialogContentText>
          <TextField
            label='Day of Week'
            name='dayOfWeek'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.dayOfWeek}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.dayOfWeek ? formik.errors.dayOfWeek : ""}
            error={formik.touched.dayOfWeek && Boolean(formik.errors.dayOfWeek)}
            required
          />
          <TextField
            label='Week of Month'
            name='weekOfMonth'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.weekOfMonth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.weekOfMonth ? formik.errors.weekOfMonth : ""}
            error={formik.touched.weekOfMonth && Boolean(formik.errors.weekOfMonth)}
            required
          />
          <TextField
            label='Time'
            name='time'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.time ? formik.errors.time : ""}
            error={formik.touched.time && Boolean(formik.errors.time)}
            required
          />
          <TextField
            select
            label='Facility'
            name='facility'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.facility}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.facility ? formik.errors.facility : ""}
            error={formik.touched.facility && Boolean(formik.errors.facility)}
            required
          >
            {facilityData.map(option => (
              <MenuItem key={option.name} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label='Gender'
            name='gender'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.gender ? formik.errors.gender : ""}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            required
          >
            {genderOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={<Checkbox
              sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
              name='membersAreNeeded'
              checked={formik.values.membersAreNeeded}
              value={formik.values.membersAreNeeded}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />}
            label="Members are Needed?" sx={{ color: nchandiTheme.handiDarkBlue}}
          />
          {formik.values.membersAreNeeded &&
          <TextField
            label='# Needed'
            name='numberNeeded'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.numberNeeded}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.numberNeeded ? formik.errors.numberNeeded : ""}
            error={formik.touched.numberNeeded && Boolean(formik.errors.numberNeeded)}
          />}
          <TextField
            label='Board Champion'
            name='boardChampion'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.boardChampion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.boardChampion ? formik.errors.boardChampion : ""}
            error={formik.touched.boardChampion && Boolean(formik.errors.boardChampion)}
          />
          <TextField
            label='Panel Coordinator'
            name='panelCoordinator'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.panelCoordinator}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.panelCoordinator ? formik.errors.panelCoordinator : ""}
            error={formik.touched.panelCoordinator && Boolean(formik.errors.panelCoordinator)}
          />
          <TextField
            label='Panel Leader'
            name='panelLeader'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.panelLeader}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.panelLeader ? formik.errors.panelLeader : ""}
            error={formik.touched.panelLeader && Boolean(formik.errors.panelLeader)}
          />
          <TextField
            label='Panel Member 1'
            name='panelMember1'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.panelMember1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.panelMember1 ? formik.errors.panelMember1 : ""}
            error={formik.touched.panelMember1 && Boolean(formik.errors.panelMember1)}
          />
          <TextField
            label='Panel Member 2'
            name='panelMember2'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.panelMember2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.panelMember2 ? formik.errors.panelMember2 : ""}
            error={formik.touched.panelMember2 && Boolean(formik.errors.panelMember2)}
          />
          <TextField
            label='Panel Member 3'
            name='panelMember3'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.panelMember3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.panelMember3 ? formik.errors.panelMember3 : ""}
            error={formik.touched.panelMember3 && Boolean(formik.errors.panelMember3)}
          />
          <TextField
            label='Panel Member 4'
            name='panelMember4'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.panelMember4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.panelMember4 ? formik.errors.panelMember4 : ""}
            error={formik.touched.panelMember4 && Boolean(formik.errors.panelMember4)}
          />
          <TextField
            label='Panel Member 5'
            name='panelMember5'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.panelMember5}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.panelMember5 ? formik.errors.panelMember5 : ""}
            error={formik.touched.panelMember5 && Boolean(formik.errors.panelMember5)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='secondary' onClick={handleSave}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PanelMembersDashboardDialog;