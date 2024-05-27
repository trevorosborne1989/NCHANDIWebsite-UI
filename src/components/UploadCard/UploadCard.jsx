import React, {useState} from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
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
      let split = e.target.files[0]?.name.split('.');
      split?.pop();
      let fileName = split?.join(".");
      formik.setFieldValue('name', fileName);
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
          <Typography variant='h5' color='white' py={4} textAlign={'center'}>
            Upload a Resource
          </Typography>
          <Box pb={4} textAlign={'center'}>
            <Button
              component="label"
              sx={{ width: '75%' }}
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
              Max Upload Size 1MB
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