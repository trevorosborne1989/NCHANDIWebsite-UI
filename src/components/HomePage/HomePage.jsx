import React, { useState, useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import snackbarMessages from '../../lib/snackbarMessages';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Tooltip,
  IconButton,
  Link,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  SendRounded,
  MailOutline,
  AttachFile,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { nchandiTheme } from '../../App';
import NCHANDIWebsiteService from '../../lib/NCHANDIWebsiteService'

const nchandiWebsiteService = new NCHANDIWebsiteService();

const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
  color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

const getListOfColors = (size) => {
  let colorList = [];
  for (let i = 0; i < size; i++) {
    colorList.push(getRandomColor());
  }
  return colorList
}

const HomePage = () => {
  const [listData, setListData] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();

  /**
   *
   */
  const fetchListData = useCallback(async () => {
    try {
      setLoading(true);
      const announcements = (await nchandiWebsiteService.getResourceItems()).data.filter(resourceItem => (resourceItem?.type === 'Announcement' || resourceItem?.type === 'Announcement With Attachment'));
      setColors(getListOfColors(announcements.length));
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
  const handleClickAttachment = async (e, entity) => {
    e.stopPropagation();
    setLoading(true);
    try {
      let response = await nchandiWebsiteService.getAttachmentWithAttachmentId({}, entity.id);
      window.open(URL.createObjectURL(response.data))
    } catch (error) {
      console.error(error);
      enqueueSnackbar('There was an error retrieving the attachment!', snackbarMessages.error.configuration);
    } finally {
      setLoading(false);
    }
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
      </Box>
      <Box display='flex' justifyContent="center" alignItems="center" mb={4} >
        <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue, width: '80%' }} variant="elevation" elevation={10}>
          <Grid container spacing={1} alignContent={'center'} justifyContent={'center'} alignItems="center" textAlign='center' py={2} mb={2}>
            <Grid sm={12} md={11} alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems="center" textAlign={'center'}>
              <CardContent>
                <Typography variant='h5' color='white' py={2} marginLeft={3} marginRight={3} >
                  Learn how to join H&I and attend our orientation meetings.
                </Typography>
              </CardContent>
            </Grid>
            <Grid sm={12} md={5} alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems="center" textAlign={'center'}>
              <Button
                variant='contained'
                size='large'
                color='primary'
                onClick={() => history('/orientation')}
                sx={{width: '85%'}}
              >
                ORIENTATION
              </Button>
            </Grid>
            <Grid sm={12} md={5} alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems="center" textAlign={'center'}>
              <Button
                variant='contained'
                size='large'
                color='primary'
                onClick={() => history('/contact')}
                sx={{width: '85%'}}
              >
                CONTACT US
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box display='flex' justifyContent="center" alignItems="center" py={3} mb={2} >
        <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue, width: '75%' }} variant="elevation" elevation={10}>
          <Grid container spacing={1} alignContent={'center'} justifyContent={'center'} alignItems="center" textAlign='center' py={2} mb={2}>
            <Grid sm={12} md={11} alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems="center" textAlign={'center'}>
              <CardContent>
                <Typography variant='h5' color='white' py={2} marginLeft={3} marginRight={3} >
                  Visit our Panels page to learn where we need your help.
                </Typography>
              </CardContent>
            </Grid>
            <Grid sm={12} md={5} alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems="center" textAlign={'center'}>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                onClick={() => history('/panels')}
                sx={{width: '100%'}}
              >
                OPEN PANELS
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box display='flex' justifyContent="center" alignItems="center" py={3} mb={2} >
        <Card sx={{ backgroundColor: nchandiTheme.handiDarkBlue, width: '70%' }} variant="elevation" elevation={10}>
          <Grid container spacing={1} alignContent={'center'} justifyContent={'center'} alignItems="center" textAlign='center' py={2} mb={2}>
            <Grid sm={12} md={11} alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems="center" textAlign={'center'}>
              <CardContent>
                <Typography variant='h5' color='white' py={2} marginLeft={3} marginRight={3} >
                  Visit our resources page to order literature, view our financial reports and important links.
                </Typography>
              </CardContent>
            </Grid>
            <Grid sm={12} md={5} alignContent={'center'} justifyContent={'center'} justifyItems={'center'} alignItems="center" textAlign={'center'}>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                onClick={() => history('/resources')}
                sx={{width: '100%'}}
              >
                RESOURCES
              </Button>
            </Grid>
          </Grid>
        </Card>
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
            <Button
              variant='contained'
              href='http://eepurl.com/dslIWb'
              target="_blank"
              size='large'
              sx={{ backgroundColor: nchandiTheme.handiGreen }}
              endIcon={<SendRounded/>}
              >
                Register
            </Button>
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
          {listData?.map((item, index) => (
            <Box pb={3}>
              <Card variant="elevation" elevation={15} sx={{ maxWidth: 900, backgroundColor: colors[index] }}>
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
                {item?.url &&
                  <Box alignItems={'center'} mb={2}>
                    <Card variant="elevation" elevation={10} sx={{ maxWidth: '70%', backgroundColor: nchandiTheme.handiSkyBlue }}>
                      <Box pb={1} pt={1}>
                        <Link variant={'h5'} underline='always' href={item.url} target="_blank" >
                          {item.urlTitle}
                        </Link>
                      </Box>
                    </Card>
                  </Box>
                }
                {item?.type === "Announcement With Attachment" &&
                <Box alignItems={'center'} mb={2}>
                  <Card variant="elevation" elevation={10} sx={{ maxWidth: '10%', backgroundColor: "#f8d77f" }}>
                    <Tooltip title="See Attachment">
                      <IconButton>
                        <AttachFile
                          fontSize='large'
                          color={'info'}
                          onClick={e => handleClickAttachment(e, item)}
                          sx={{"&:hover": { color: nchandiTheme.handiDarkYellow }, fontSize: '200%'}}
                        />
                      </IconButton>
                    </Tooltip>
                  </Card>
                </Box>
                }
              </Card>
            </Box>
          ))}
        </CardContent>
      </Box>
    </Container>
  )
}

export default HomePage;