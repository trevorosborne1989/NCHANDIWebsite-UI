import React, {useState} from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
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

const UploadCard = ({formik, onSave, announcment}) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      formik.setFieldValue('file', e.target.files[0])
      if (!announcment) {
        let split = e.target.files[0]?.name.split('.');
        split?.pop();
        let fileName = split?.join(".");
        formik.setFieldValue('name', fileName);
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
          {announcment ?
            <Typography variant='h5' color='white' py={4} textAlign={'center'}>
              Create Announcement
            </Typography>
          :
            <Typography variant='h5' color='white' py={4} textAlign={'center'}>
              Upload a Resource
            </Typography>
          }
          {announcment &&
          <>
            <Box py={2} pb={3}>
              <Typography variant='h5' color={nchandiTheme.handiSecondaryWhite}>
                Header
              </Typography>
              <TextField
                name='name'
                fullWidth
                variant='filled'
                size='small'
                color='secondary'
                focused
                sx={{input: { color: nchandiTheme.handiSecondaryWhite }}}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.name ? formik.errors.name : ""}
                error={formik.touched.name && Boolean(formik.errors.name)}
                required
              />
              <Typography variant='h5' color={nchandiTheme.handiSecondaryWhite} py={3}>
                Body
              </Typography>
              <TextField
                name='body'
                fullWidth
                variant='filled'
                size='small'
                color='secondary'
                focused
                multiline
                rows={6}
                inputProps={{ style: { color: nchandiTheme.handiSecondaryWhite } }}
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.body ? formik.errors.body : ""}
                error={formik.touched.body && Boolean(formik.errors.body)}
                required
              />
            </Box>
            <FormGroup>
              <Box textAlign={'center'} pb={3} >
                <FormControlLabel
                  control={<Checkbox
                    sx={{ color: nchandiTheme.handiCyan,'&.Mui-checked': {color: nchandiTheme.handiCyan} }}
                    name='addUrl'
                    checked={formik.values.addUrl}
                    value={formik.values.addUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />}
                />
                <Typography variant='h7' color={nchandiTheme.handiSecondaryWhite}>
                  Add a URL?
                </Typography>
              </Box>
              {formik.values.addUrl &&
              <>
                <Box textAlign={'left'} pt={2} pb={4}>
                  <Typography variant='h6' color={nchandiTheme.handiSecondaryWhite}>
                    Title of URL
                  </Typography>
                  <TextField
                    name='urlTitle'
                    fullWidth
                    variant='filled'
                    size='medium'
                    color='info'
                    focused
                    margin='dense'
                    sx={{input: { color: nchandiTheme.handiSecondaryWhite }}}
                    value={formik.values.urlTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.urlTitle ? formik.errors.urlTitle : ""}
                    error={formik.touched.urlTitle && Boolean(formik.errors.urlTitle)}
                    required
                  />
                  <Typography variant='h6' color={nchandiTheme.handiSecondaryWhite} pt={2}>
                    The URL
                  </Typography>
                  <TextField
                    name='url'
                    fullWidth
                    variant='filled'
                    size='small'
                    color='info'
                    focused
                    margin='dense'
                    sx={{input: { color: nchandiTheme.handiSecondaryWhite }}}
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.url ? formik.errors.url : ""}
                    error={formik.touched.url && Boolean(formik.errors.url)}
                    required
                  />
                </Box>
              </>
              }
            </FormGroup>
          </>
          }
          <Box pb={4} pt={1} textAlign={'center'}>
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