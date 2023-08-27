import React from 'react';
import { Box, Container, Typography, Card, CardContent, Divider } from '@mui/material';
import { SendRounded, MailOutline } from '@mui/icons-material'
import { Button } from '@mui/material';
import { nchandiTheme } from '../../App';


const HomePage = () => {

  return (
    <Container>
      <Box textAlign={'center'} py={3} mb={2} >
        <Typography variant="h3" color={'white'} mb={1.5} >
          North County Hospitals & Institutions
        </Typography>
        <Typography variant='h6' color={'white'}>
          Sharing the AA message to those who cannot get to a meeting in North County San Diego
        </Typography>
      </Box>
      <Box py={3}>
        <Divider sx={{background: 'white'}} />
      </Box>
      <Box py={3} mb={2} textAlign={'center'}>
        <Typography variant="h4" color='white' py={2} mb={1.5} >
          Interested in joining North County H&I?
        </Typography>
        <Box sx={{ flexDirection: 'column'}} display='flex' justifyContent="center" alignItems="center" py={3} mb={2} >
          <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue, width: '80%' }} variant="elevation" elevation={10}>
            <CardContent>
              <Typography variant='h5' color='white' py={2} marginLeft={3} marginRight={3} >
                Learn how to join H&I and attend our orientation meetings.
              </Typography>
            </CardContent>
            <Box display='flex' justifyContent="center" >
              <Box display="flex" py={1.5} marginRight={3} >
                <Button variant='contained' size='large' color='primary' sx={{ width: 250 }} >ORIENTATION</Button>
              </Box>
              <Box display="flex" py={1.5} >
                <Button variant='contained' size='large' color='primary' sx={{ width: 250 }} >CONTACT US</Button>
              </Box>
            </Box>
          </Card>
        </Box>
        <Box sx={{ flexDirection: 'column'}} display='flex' justifyContent="center" alignItems="center" py={3} mb={2} >
          <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue, width: '75%' }} variant="elevation" elevation={10}>
            <CardContent>
              <Typography variant='h5' color='white' py={2} marginLeft={3} marginRight={3} >
                Visit our Panels page to learn where we need your help.
              </Typography>
            </CardContent>
            <Box display='flex' justifyContent="center" >
              <Box display="flex" py={1.5} >
                <Button variant='contained' size='large' color='secondary' sx={{ width: 300 }}>OPEN PANELS</Button>
              </Box>
            </Box>
          </Card>
        </Box>
        <Box sx={{ flexDirection: 'row'}} display='flex' justifyContent="center" alignItems="center" py={3} mb={2} >
          <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue, width: '70%' }} variant="elevation" elevation={10}>
            <CardContent>
              <Typography variant='h5' color='white' py={2} marginLeft={3} marginRight={3} >
                Visit our resources page to order literature, view our financial reports and important links.
              </Typography>
            </CardContent>
            <Box display='flex' justifyContent="center" >
              <Box display="flex" py={1.5} >
                <Button variant='contained' size='large' color='secondary' sx={{ width: 300 }}>RESOURCES</Button>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
      <Box py={3}>
        <Divider />
      </Box>
      <Box display='flex' justifyContent="center" alignItems="left" py={3} mb={2}>
        <Box display={'flex'} marginRight={3} >
          <MailOutline sx={{ fontSize: 150, color: nchandiTheme.handiSecondaryWhite }} ></MailOutline>
        </Box>
        <Box display='flex' sx={{ flexDirection: 'column' }}>
          <Typography variant="h4" color={'white'} gutterBottom>
            Get Connected
          </Typography>
          <Typography variant='h6' color={'white'} gutterBottom>
            Join our mailing list to receiving limited emails about orientation dates, panel openings and special events.
          </Typography>
          <Box display="flex" py={1.5} >
            <Button variant='contained' size='large' sx={{ backgroundColor: nchandiTheme.handiGreen }} endIcon={<SendRounded/>}>Register</Button>
          </Box>
        </Box>
      </Box>
      <Box py={3}>
        <Divider />
      </Box>
      <Box align='center' alignItems='center' mb={8} sx={{ backgroundColor: nchandiTheme.handiSecondaryWhite } }>
        <CardContent>
          <Typography variant="h3" color={nchandiTheme.handiBlue} py={1} mb={7}>
            Announcements
          </Typography>
          <Card variant="elevation" elevation={15} sx={{ maxWidth: 900, backgroundColor: "#f8d77f" }}>
            <Typography variant="h4" py={2} mb={1.5}>
              Summer Service Fair is June 24
            </Typography>
            <Typography variant='h6' mb={1}>
              Posted Date: Sun Jun 18 2023
            </Typography>
          </Card>
          <Card variant="elevation" elevation={5} sx={{ maxWidth: 850 }}>
            <Typography variant='h6' marginTop={5} py={2} >
            Join us at the Summer Service Fair, Saturday June 24 from 10AM to 1 PM at the Carlsbad Senior Center, 799 Pine Avenue, Carlsbad, CA 92008.
            </Typography>
            <Typography variant='h6' mb={4}>
              Download the flyer here: https://tinyurl.com/2u8m7re2
            </Typography>
          </Card>
        </CardContent>
      </Box>
    </Container>
  )
}

export default HomePage;