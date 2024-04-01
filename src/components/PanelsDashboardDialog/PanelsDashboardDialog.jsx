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
  IconButton,
  Box,
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { nchandiTheme } from '../../App';

const genderOptions = [
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

const PanelsDashboardDialog = ({ formik, facilityData, peopleData, isOpen, handleClear, handleSave, handleClose }) => {

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
            name='eventTime'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values.eventTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.eventTime ? formik.errors.eventTime : ""}
            error={formik.touched.eventTime && Boolean(formik.errors.eventTime)}
            required
          />
          <Box display={'flex'}>
            <TextField
              select
              label='Facility'
              name='facility'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values.facility?.name}
              onChange={e => formik.setFieldValue('facility', facilityData.find(facility => facility.name === e.target.value))}
              onBlur={formik.handleBlur}
              helperText={formik.touched.facility ? formik.errors.facility  : ""}
              error={formik.touched.facility && Boolean(formik.errors.facility)}
              required
            >
              {facilityData.map(option => (
                <MenuItem key={option?.name} value={option?.name} >
                  {option?.name}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color='error' onClick={e => handleClear(e, 'facility')} data-cy='modal-clear-facility'>
              <Clear fontSize='large' />
            </IconButton>
          </Box>
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
              sx={{ color: nchandiTheme.handiDarkGreen, '&.Mui-checked': { color: nchandiTheme.handiGreen } }}
              name='markAsMembersNeeded'
              checked={formik.values.markAsMembersNeeded}
              value={formik.values.markAsMembersNeeded}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />}
            label="Members are Needed?" sx={{ color: nchandiTheme.handiDarkBlue }}
          />
          {formik.values.markAsMembersNeeded &&
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
          <Box display={'flex'}>
            <TextField
              select
              label='Board Champion'
              name='boardChampion'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values.boardChampion?.firstName + formik.values?.boardChampion?.lastName}
              onChange={e => formik.setFieldValue('boardChampion', peopleData.find(person => person.firstName + person.lastName === e.target.value))}
              onBlur={formik.handleBlur}
              helperText={formik.touched.boardChampion ? formik.errors.boardChampion : ""}
              error={formik.touched.boardChampion && Boolean(formik.errors.boardChampion)}
            >
              {peopleData.map(option => (
                <MenuItem key={option?.firstName + option?.lastName} value={option?.firstName + option?.lastName}>
                  {option?.firstName + ' ' + option?.lastName}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color='error' onClick={e => handleClear(e, 'boardChampion')} data-cy='modal-clear-board-champion'>
              <Clear fontSize='large' />
            </IconButton>
          </Box>
          <Box display={'flex'}>
            <TextField
              select
              label='Panel Coordinator'
              name='panelCoordinator'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values?.panelCoordinator?.firstName + formik.values?.panelCoordinator?.lastName}
              onChange={e => formik.setFieldValue('panelCoordinator', peopleData.find(person => person.firstName + person.lastName === e.target.value))}
              onBlur={formik.handleBlur}
              helperText={formik.touched.panelCoordinator ? formik.errors.panelCoordinator : ""}
              error={formik.touched.panelCoordinator && Boolean(formik.errors.panelCoordinator)}
            >
              {peopleData.map(option => (
                <MenuItem key={option?.firstName + option?.lastName} value={option?.firstName + option?.lastName}>
                  {option?.firstName + ' ' + option?.lastName}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color='error' onClick={e => handleClear(e, 'panelCoordinator')} data-cy='modal-clear-panel-coordinator'>
              <Clear fontSize='large' />
            </IconButton>
          </Box>
          <Box display={'flex'}>
            <TextField
              select
              label='Panel Leader'
              name='panelLeader.'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values?.panelLeader?.firstName + formik.values?.panelLeader?.lastName}
              onChange={e => formik.setFieldValue('panelLeader', peopleData.find(person => person.firstName + person.lastName === e.target.value))}
              onBlur={formik.handleBlur}
              helperText={formik.touched.panelLeader ? formik.errors.panelLeader : ""}
              error={formik.touched.panelLeader && Boolean(formik.errors.panelLeader)}
            >
              {peopleData.map(option => (
                <MenuItem key={option?.firstName + option?.lastName} value={option?.firstName + option?.lastName}>
                  {option?.firstName + ' ' + option?.lastName}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color='error' onClick={e => handleClear(e, 'panelLeader')} data-cy='modal-clear-panel-leader'>
              <Clear fontSize='large' />
            </IconButton>
          </Box>
          <Box display={'flex'}>
            <TextField
              select
              label='Panel Member 1'
              name='panelMember1'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values?.panelMember1?.firstName + formik.values?.panelMember1?.lastName}
              onChange={e => formik.setFieldValue('panelMember1', peopleData.find(person => person.firstName + person.lastName === e.target.value))}
              onBlur={formik.handleBlur}
              helperText={formik.touched.panelMember1 ? formik.errors.panelMember1 : ""}
              error={formik.touched.panelMember1 && Boolean(formik.errors.panelMember1)}
            >
              {peopleData.map(option => (
                <MenuItem key={option?.firstName + option?.lastName} value={option?.firstName + option?.lastName}>
                  {option?.firstName + ' ' + option?.lastName}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color='error' onClick={e => handleClear(e, 'panelMember1')} data-cy='modal-clear-panel-member1'>
              <Clear fontSize='large' />
            </IconButton>
          </Box>
          <Box display={'flex'}>
          <TextField
            select
            label='Panel Member 2'
            name='panelMember2'
            fullWidth
            variant='outlined'
            margin='dense'
            value={formik.values?.panelMember2?.firstName + formik.values?.panelMember2?.lastName}
            onChange={e => formik.setFieldValue('panelMember2', peopleData.find(person => person.firstName + person.lastName === e.target.value))}
            onBlur={formik.handleBlur}
            helperText={formik.touched.panelMember2 ? formik.errors.panelMember2 : ""}
            error={formik.touched.panelMember2 && Boolean(formik.errors.panelMember2)}
          >
            {peopleData.map(option => (
              <MenuItem key={option?.firstName + option?.lastName} value={option?.firstName + option?.lastName}>
                {option?.firstName + ' ' + option?.lastName}
              </MenuItem>
            ))}
          </TextField>
          <IconButton color='error' onClick={e => handleClear(e, 'panelMember2')} data-cy='modal-clear-panel-member2'>
            <Clear fontSize='large' />
          </IconButton>
          </Box>
          <Box display={'flex'}>
            <TextField
              select
              label='Panel Member 3'
              name='panelMember3'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values?.panelMember3?.firstName + formik.values?.panelMember3?.lastName}
              onChange={e => formik.setFieldValue('panelMember3', peopleData.find(person => person.firstName + person.lastName === e.target.value))}
              onBlur={formik.handleBlur}
              helperText={formik.touched.panelMember3 ? formik.errors.panelMember3 : ""}
              error={formik.touched.panelMember3 && Boolean(formik.errors.panelMember3)}
            >
              {peopleData.map(option => (
                <MenuItem key={option?.firstName + option?.lastName} value={option?.firstName + option?.lastName}>
                  {option.firstName + option.lastName}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color='error' onClick={e => handleClear(e, 'panelMember3')} data-cy='modal-clear-panel-member3'>
              <Clear fontSize='large' />
            </IconButton>
          </Box>
          <Box display={'flex'}>
            <TextField
              select
              label='Panel Member 4'
              name='panelMember4'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values?.panelMember4?.firstName + formik.values?.panelMember4?.lastName}
              onChange={e => formik.setFieldValue('panelMember4', peopleData.find(person => person.firstName + person.lastName === e.target.value))}
              onBlur={formik.handleBlur}
              helperText={formik.touched.panelMember4 ? formik.errors.panelMember4 : ""}
              error={formik.touched.panelMember4 && Boolean(formik.errors.panelMember4)}
            >
              {peopleData.map(option => (
                <MenuItem key={option.firstName + option.lastName} value={option?.firstName + option?.lastName}>
                  {option?.firstName + ' ' + option?.lastName}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color='error' onClick={e => handleClear(e, 'panelMember4')} data-cy='modal-clear-panel-member4'>
              <Clear fontSize='large' />
            </IconButton>
          </Box>
          <Box display={'flex'}>
            <TextField
              select
              label='Panel Member 5'
              name='panelMember5'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values?.panelMember5?.firstName + formik.values?.panelMember5?.lastName}
              onChange={e => formik.setFieldValue('panelMember5', peopleData.find(person => person.firstName + person.lastName === e.target.value))}
              onBlur={formik.handleBlur}
              helperText={formik.touched.panelMember5 ? formik.errors.panelMember5 : ""}
              error={formik.touched.panelMember5 && Boolean(formik.errors.panelMember5)}
            >
              {peopleData.map(option => (
                <MenuItem key={option?.firstName + option?.lastName} value={option?.firstName + option?.lastName}>
                  {option?.firstName + ' ' + option?.lastName}
                </MenuItem>
              ))}
            </TextField>
            <IconButton color='error' onClick={e => handleClear(e, 'panelMember5')} data-cy='modal-clear-panel-member5'>
              <Clear fontSize='large' />
            </IconButton>
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

export default PanelsDashboardDialog;