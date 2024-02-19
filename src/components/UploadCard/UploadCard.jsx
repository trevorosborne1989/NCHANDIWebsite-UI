import React, {useState} from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Chip,
  } from '@mui/material';
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

const UploadCard = ({formik, onSave}) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      formik.setFieldValue('file', e.target.files[0])
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
          <Box py={2} pb={3}>
            <TextField
              label='Resource Title'
              name='resourceTitle'
              fullWidth
              variant='filled'
              size='medium'
              color='secondary'
              focused
              sx={{input: { color: nchandiTheme.handiSecondaryWhite }}}
              value={formik.values.resourceTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.resourceTitle ? formik.errors.resourceTitle : ""}
              error={formik.touched.resourceTitle && Boolean(formik.errors.resourceTitle)}
              required
            />
          </Box>
          <Box pb={4}>
            <Button
              component="label"
              fullWidth
              startIcon={<CloudUpload />}
              variant="contained"
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

export default UploadCard;