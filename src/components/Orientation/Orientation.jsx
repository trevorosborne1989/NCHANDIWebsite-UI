import React from 'react';
import { Box, Container, Divider, List, Typography, ListItem } from '@mui/material';
import { nchandiTheme } from '../../App';

const Orientation = () => {
    return (
      <>
        <Container>
          <Box py={3} pb={7}>
            <Typography variant="h3" color={'white'} textAlign={'center'} pb={5} pl={3} pr={3} >
              Orientation
            </Typography>
            <Box pb={7} >
              <Divider sx={{background: 'white'}} />
            </Box>
            <Typography variant="h5" color={'white'} pb={5} pl={3} pr={3}>
              Are you interested in joining H&I? Service work through Hospital
              and Institutions is a rewarding way to spend your time. Being a
              panel member, you will go into facilities around San Diego
              carrying the message of hope and freedom to the still suffering
              alcoholic. To get started there's just a few things you need to
              do. Please use this page as a resource for the steps you need to
              take to become a panel member. We look forward to meeting you soon.
            </Typography>
          </Box>
          <Box display={'flex'} sx={{ flexDirection: 'row' }} pb={7} >
            <Box sx={{ flexDirection: 'column' }} textAlign={'center'}>
              <Typography variant='h4' color='white' pb={5} pl={3} pr={3}>
                How-To's of Joining H&I
              </Typography>
              <Box
                component="img"
                sx={{ height: '40%', width: '50%', margin: 'auto' }}
                src={require('../../resources/images/coordination.png')}
                pb={5}
              />
              <Box textAlign={'left'}>
                <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                  1. Verify that you qualify based on the sobriety requirements below.
                </Typography>
                <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                  2. Attend an orientation - see upcoming dates on this page.
                </Typography>
                <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                  3. Go to our Panels page - find a panel you would like to join.
                </Typography>
                <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                  4. Use contact finder to find the right person to speak to about joining the panel.
                </Typography>
              </Box>
            </Box>
            <Box display={'flex'} sx={{ flexDirection: 'column' }} pb={7}>
              <Box display={'flex'} textAlign='center' pb={7}>
                <Typography variant='h4' color={'white'} pb={5} pl={5} pr={5}>
                  Orientation and Committee Board Meetings
                </Typography>
              </Box>
              <Box display={'flex'} sx={{ flexDirection: 'row' }} >
                <Box display={'flex'} sx={{ flexDirection: 'column' }} justifyContent={'center'} pb={7}>
                  <Typography variant='h4' color='white' pb={5} pl={3} pr={3}>
                    Next Meeting:
                  </Typography>
                  <Typography variant='h5' color='white' pb={5} pl={3} pr={3}>
                    {/* {data.nextMeeting} */}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 7, background: 'white' }} />
                <Box display={'flex'} sx={{ flexDirection: 'column' }} pb={7} pl={7} >
                  <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                    Sat Jul 15 2023
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box pb={7} >
            <Divider />
          </Box>
          <Box display={'flex'} sx={{ flexDirection: 'row' }} pb={7} >
            <Box display={'flex'} textAlign={'center'} sx={{ flexDirection: 'column' }} >
              <Typography variant='h4' color='white' pl={3} pr={3}>
                Sobriety Requirements
              </Typography>
              <Box
                  component="img"
                  sx={{ height: '45%', width: '30%', margin: 'auto' }}
                  src={require('../../resources/images/checklist.png')}
                />
              <Typography variant='h5' color='white' textAlign={'left'} pb={5} pl={3} pr={3}>
              To participate in H&I you must meet the minimum sobriety requirement. While the
              committee never wants this to be a prohibitive factor that keeps someone from
              being of service, we kindly ask that you respect the minimum requirements.
              </Typography>
            </Box>
            <Box display={'flex'} sx={{ flexDirection: 'column', minWidth: 425 }} pl={5}>
              <List sx = {{fontSize: '40px', color: 'white', listStyleType: 'disc', pl: 2, '& .MuiListItem-root': {display: 'list-item',}, }}>
              <ListItem>
              <Typography variant='h4' color='white' pb={1} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              </ListItem>
              <ListItem>
              <Typography variant='h4' color='white' pb={1} pl={3} pr={3}>
                Panel Members: 6 months
              </Typography>
              </ListItem>
              <ListItem>
              <Typography variant='h4' color='white' pb={1} pl={3} pr={3}>
                Panel Leaders: 1 year
              </Typography>
              </ListItem>
              <ListItem>
              <Typography variant='h4' color='white' pb={1} pl={3} pr={3}>
                Panel Coordinator: 2 Years
              </Typography>
              </ListItem>
              </List>
            </Box>
          </Box>
        </Container>
        <Container sx={{backgroundColor: nchandiTheme.handiDarkGreen}} >
          <Box py={3} pb={7}>
            <Typography variant="h3" color={'white'} textAlign={'center'} pb={5} pl={3} pr={3} >
              Orientation Location
            </Typography>
          </Box>
          <Box display={'flex'} sx={{ flexDirection: 'row' }} pb={7}>
            <Box
              component="img"
              sx={{ height: '50%', width: '35%', margin: 'auto' }}
              src={require('../../resources/images/destination.png')}
              pl={7}
            />
            <Box display={'flex'} sx={{ flexDirection: 'column', maxWidth: 650 }} pl={7}>
              <Typography variant='h4' color='white' pb={5} pl={3} pr={3}>
                All orientation meetings are held at:
              </Typography>
              <Typography variant='h5' color='white' pb={5} pl={3} pr={3}>
                North County Alano Club, 4198 Mission Ave, Oceanside, 92057
                The third Saturday of every month
              </Typography>
              <Typography variant='h5' color='white' pb={5} pl={3} pr={3}>
                9:00am - 9:45am General Information and Orientation
              </Typography>
              <Typography variant='h5' color='white' pb={5} pl={3} pr={3}>
                9:45am - 11:00am Board Meeting
              </Typography>
            </Box>
          </Box>
          <Box textAlign={'center'} pb={7}>
            <Box
              component="img"
              sx={{ height: '40%', width: '50%', margin: 'auto' }}
              src={require('../../resources/images/Logo-transparancy.png')}
            />
          </Box>
        </Container>
      </>
    )
}

export default Orientation;