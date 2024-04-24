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
  Typography,
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { nchandiTheme } from '../../App';

const dayOfWeekOptions = [
  {
    value: 'Monday',
    label: 'Monday'
  },
  {
    value: 'Tuesday',
    label: 'Tuesday'
  },
  {
    value: 'Wednesday',
    label: 'Wednesday'
  },
  {
    value: 'Thursday',
    label: 'Thursday'
  },
  {
    value: 'Friday',
    label: 'Friday'
  },
  {
    value: 'Saturday',
    label: 'Saturday'
  },
  {
    value: 'Sunday',
    label: 'Sunday'
  },
];

const fiveOptions = [
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
  },
  {
    value: 4,
    label: '4'
  },
  {
    value: 5,
    label: '5'
  },
];

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

const PanelsDashboardDialog = ({ formik, facilityData, peopleData, isOpen, handleCheckbox, handleClear, handleSave, handleClose }) => {

  const handlePanelMemberChange = (e, panelMember) => {
    formik.setFieldValue(panelMember, peopleData.find(person => person.firstName + person.lastName === e.target.value));
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Panel</DialogTitle>
        <DialogContent>
          <DialogContentText pb={3}>
            Please fill out the panel information below.
          </DialogContentText>
          <TextField
            select
            label='Day Of Week'
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
          >
            {dayOfWeekOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label='Week Of Month'
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
          >
            {fiveOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              name='eventTime'
              value={formik.values?.eventTime?.split(':')[1].slice(-2) === 'PM' ?
                dayjs(new Date(2024, 10, 20, Number(formik.values?.eventTime?.split(':')[0]) + 12, Number(formik.values?.eventTime?.split(':')[1].slice(0, 2))))
                :
                dayjs(new Date(2024, 10, 20, Number(formik.values?.eventTime?.split(':')[0]), Number(formik.values?.eventTime?.split(':')[1].slice(0, 2))))}
              onChange={(value => formik.setFieldValue('eventTime', value?.toDate().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'))) }
              slotProps={{ textField: { fullWidth: true } }}
              label={<Typography py={1}>Time of Event</Typography>}
            />
          </LocalizationProvider>
          <Box display={'flex'}>
            <TextField
              select
              label='Facility'
              name='facility'
              fullWidth
              variant='outlined'
              margin='normal'
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
            value={formik.values.gender ? formik.values.gender : ''}
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
              size='large'
              checked={formik.values.markAsMembersNeeded}
              value={formik.values.markAsMembersNeeded}
              onChange={handleCheckbox}
              onBlur={formik.handleBlur}
            />}
            label="Members are Needed?" sx={{ color: nchandiTheme.handiDarkBlue }}
          />
          {formik.values.markAsMembersNeeded &&
            <TextField
              select
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
              required
            >
              {fiveOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>}
          <Box display={'flex'}>
            <TextField
              select
              label='Board Champion'
              name='boardChampion'
              fullWidth
              variant='outlined'
              margin='dense'
              value={formik.values?.boardChampion ? formik.values.boardChampion?.firstName + formik.values?.boardChampion?.lastName : ''}
              onChange={e => handlePanelMemberChange(e, 'boardChampion')}
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
              value={formik.values?.panelCoordinator ? formik.values?.panelCoordinator?.firstName + formik.values?.panelCoordinator?.lastName : ''}
              onChange={e => handlePanelMemberChange(e, 'panelCoordinator')}
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
              value={formik.values?.panelLeader ? formik.values?.panelLeader?.firstName + formik.values?.panelLeader?.lastName : ''}
              onChange={e => handlePanelMemberChange(e, 'panelLeader')}
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
              value={formik.values?.panelMember1 ? formik.values?.panelMember1?.firstName + formik.values?.panelMember1?.lastName : ''}
              onChange={e => handlePanelMemberChange(e, 'panelMember1')}
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
            value={formik.values?.panelMember2 ? formik.values?.panelMember2?.firstName + formik.values?.panelMember2?.lastName : ''}
            onChange={e => handlePanelMemberChange(e, 'panelMember2')}
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
              value={formik.values?.panelMember3 ? formik.values?.panelMember3?.firstName + formik.values?.panelMember3?.lastName : ''}
              onChange={e => handlePanelMemberChange(e, 'panelMember3')}
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
              value={formik.values?.panelMember4 ? formik.values?.panelMember4?.firstName + formik.values?.panelMember4?.lastName : ''}
              onChange={e => handlePanelMemberChange(e, 'panelMember4')}
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
              value={formik.values?.panelMember5 ? formik.values?.panelMember5?.firstName + formik.values?.panelMember5?.lastName : ''}
              onChange={e => handlePanelMemberChange(e, 'panelMember5')}
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