import React, {useState} from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  InputLabel,
  Chip,
  MenuItem,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Select,
  } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  CloudUpload,
} from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import { nchandiTheme } from '../../App';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CustomSelect = styled(Select)(() => ({
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: nchandiTheme.handiDarkGreen
    },
    "&:hover fieldset": {
      borderColor: nchandiTheme.handiGreen
    },
    "&.Mui-focused fieldset": {
      borderColor: nchandiTheme.handiGreen
    }
  }
}));

const monthOptions = [
  {
    value: 'January',
    label: 'January',
  },
  {
    value: 'Febuary',
    label: 'Febuary',
  },
  {
    value: 'March',
    label: 'March',
  },
  {
    value: 'April',
    label: 'April',
  },
  {
    value: 'May',
    label: 'May',
  },
  {
    value: 'June',
    label: 'June',
  },
  {
    value: 'July',
    label: 'July',
  },
  {
    value: 'August',
    label: 'August',
  },
  {
    value: 'Sepetember',
    label: 'Sepetember',
  },
  {
    value: 'October',
    label: 'October',
  },
  {
    value: 'November',
    label: 'November',
  },
  {
    value: 'December',
    label: 'December',
  },
];

const UploadReportsCard = ({formik, onSave}) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      formik.setFieldValue('file', e.target.files[0])
      if (formik.values.isFinancialReport) {
        formik.setFieldValue('financialReport', e.target.files[0]);
      }
      if (formik.values.isMinutes) {
        formik.setFieldValue('minutes', e.target.files[0]);
      }
    }
  };

  const handleChipDelete = () => {
    formik.setFieldValue('file', null);
  };

  const handleUploadClick = () => {
    setLoading(true);
    onSave();
    setLoading(false);
  };

  return (
    <>
      <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue }} variant="elevation" elevation={10}>
        <CardContent>
          <Typography variant='h5' color='white' py={2} textAlign={'center'}>
            Upload a Resource
          </Typography>
          <Grid container sm={12} spacing={1} py={2} pb={3} alignItems={'center'} justifyContent={'center'}>
            <Grid container sm={10} md={5} spacing ={1} direction={'column'}>
              <Grid sm={12}>
               <FormControlLabel
                  control={<Checkbox
                    sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                    name='isFinancialReport'
                    checked={formik.values.isFinancialReport}
                    value={formik.values.isFinancialReport}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.isFinancialReport ? formik.errors.isFinancialReport : ""}
                    error={formik.touched.isFinancialReport && Boolean(formik.errors.isFinancialReport)}
                    disabled={formik.values.isMinutes}
                    />}
                  label="Financial Report" sx={{ color: nchandiTheme.handiSecondaryWhite}}
                />
              </Grid>
              <Grid sm={12}>
                <FormControlLabel
                  control={<Checkbox
                    sx={{ color: nchandiTheme.handiDarkGreen,'&.Mui-checked': {color: nchandiTheme.handiGreen} }}
                    name='isMinutes'
                    checked={formik.values.isMinutes}
                    value={formik.values.isMinutes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.isMinutes ? formik.errors.isMinutes : ""}
                    error={formik.touched.isMinutes && Boolean(formik.errors.isMinutes)}
                    disabled={formik.values.isFinancialReport}
                    />}
                  label="Minutes" sx={{ color: nchandiTheme.handiSecondaryWhite}}
                />
              </Grid>
            </Grid>
            <Grid sm={10} md={5}>
              <Box textAlign={'center'}>
                <InputLabel id="select-helper-label" sx={{ color: nchandiTheme.handiSecondaryWhite }}>Select Month</InputLabel>
              </Box>
              <CustomSelect
                labelId='select-helper-label'
                name='monthOfYear'
                fullWidth
                variant='outlined'
                size='small'
                color='secondary'
                sx={{ color: nchandiTheme.handiSecondaryWhite }}
                margin='dense'
                value={formik.values.monthOfYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.monthOfYear ? formik.errors.monthOfYear : ""}
                error={formik.touched.monthOfYear && Boolean(formik.errors.monthOfYear)}
                required
              >
                {monthOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>
              <Box pl={2}>
                <FormHelperText sx={{ color: 'red', fontSize: '15px' }} >{formik.touched.monthOfYear ? formik.errors.monthOfYear : ""}</FormHelperText>
              </Box>
            </Grid>
          </Grid>
          <Box pb={4}>
            <Button
              component="label"
              fullWidth
              startIcon={<CloudUpload />}
              variant="contained"
              disabled={!formik.values?.isFinancialReport && !formik.values?.isMinutes}
            >
              <span>Upload File</span>
              <VisuallyHiddenInput type="file" name='file' onChange={handleFileChange} />
            </Button>
          </Box>
          <Box display="flex" justifyContent="center">
            <LoadingButton
              onClick={handleUploadClick}
              loading={loading}
              loadingPosition='center'
              variant='contained'
              disabled={loading}
              size='large'
              color='secondary'
              sx={{ width: 100, height: 80 }}
              >
                Send
              </LoadingButton>
          </Box>
          <Box textAlign={'center'} py={2}>
            <Typography variant='h7' color={nchandiTheme.handiGrey}>
              Max Upload Size 100KB
            </Typography>
          </Box>
          {formik.values?.file &&
            <Box textAlign={'center'} >
              <Chip label={formik.values?.file.name}  color='primary' onDelete={handleChipDelete} />
            </Box>
          }
        </CardContent>
      </Card>
    </>
  )
  }

export default UploadReportsCard;