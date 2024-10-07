import React, { useState, useCallback, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Divider } from '@mui/material';
import { SendRounded, MailOutline } from '@mui/icons-material'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { nchandiTheme } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const HomePage = () => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  /**
   *
   */
  const fetchListData = useCallback(async () => {
    try {
      setLoading(true);
      const announcements = (await nchandiWebsiteService.getResourceItems()).data.filter(resourceItem => resourceItem?.type === 'Announcement');
      setListData(announcements);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   *
   */
  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

  /**
   *
   */
  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
  }

  return (
    <Container>
      {loading}
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
                <Button
                  variant='contained'
                  size='large'
                  color='primary'
                  onClick={() => history('/orientation')}
                  sx={{ width: 250 }}
                >
                  ORIENTATION
                </Button>
              </Box>
              <Box display="flex" py={1.5} >
                <Button
                  variant='contained'
                  size='large'
                  color='primary'
                  onClick={() => history('/contact')}
                  sx={{ width: 250 }}
                >
                  CONTACT US
                </Button>
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
                <Button
                  variant='contained'
                  size='large'
                  color='secondary'
                  onClick={() => history('/panels')}
                  sx={{ width: 300 }}
                >
                  OPEN PANELS
                </Button>
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
                <Button
                  variant='contained'
                  size='large'
                  color='secondary'
                  onClick={() => history('/resources')}
                  sx={{ width: 300 }}
                >
                  RESOURCES
                </Button>
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
          {listData?.map(item => (
            <Box pb={3}>
              <Card variant="elevation" elevation={15} sx={{ maxWidth: 900, backgroundColor: getRandomColor() }}>
                <Typography variant="h4" py={2} mb={1.5}>
                  {item?.name}
                </Typography>
                <Typography variant='h6' mb={1}>
                  Posted Date: {item?.createdDate}
                </Typography>
              </Card>
              <Card variant="elevation" elevation={5} sx={{ maxWidth: 850 }}>
                <Typography variant='h6' marginTop={5} py={2} >
                  {item?.body}
                </Typography>
              </Card>
            </Box>
          ))}
        </CardContent>
      </Box>
    </Container>
  )
}

export default HomePage;