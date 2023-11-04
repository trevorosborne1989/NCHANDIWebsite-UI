import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  } from '@mui/material';
  import { nchandiTheme } from '../../App';



const UploadCard = (formik) => {


  return (
    <>
      <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue }} variant="elevation" elevation={10}>
        <CardContent>
          <Typography variant='h5' color='white' py={2} textAlign={'center'}>
            Upload a Resource
          </Typography>
          <Box display="flex" py={1.5} justifyContent="center">
            <Button variant='contained' size='large' color='secondary' sx={{ width: 100 }}>OPEN PANELS</Button>
          </Box>
        </CardContent>
      </Card>
    </>
  )
  }

export default UploadCard;