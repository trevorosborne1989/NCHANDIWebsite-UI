import React from 'react';
import { Box, Container, Typography, Divider, Card, CardContent } from '@mui/material';
import { Button } from '@mui/material';
import { nchandiTheme } from '../../App';


const About = () => {

  return (
    <>
      <Container >
        <Box>
          <Box textAlign={'center'} py={3} pb={7}>
            <Typography variant="h3" color={'white'} >
              About Us
            </Typography>
          </Box>
          <Box pb={7} >
            <Divider />
          </Box>
          <Box display={'flex'} sx={{ flexDirection: 'row' }} pb={7} >
            <Box>
              <Card sx={{ backgroundColor: nchandiTheme.handiBlue, width: 400, margin: 'auto' }} variant="elevation" elevation={10}>
                <CardContent>
                  <Box
                    component="img"
                    sx={{ height: '100%', width: '100%' }}
                    alt="The house from the offer."
                    src={require('../../resources/images/Logo-transparancy.png')}
                    pr={2.5}
                  />
                </CardContent>
              </Card>
            </Box>
            <Box display={'flex'} sx={{ flexDirection: 'column' }} pl={7} >
              <Typography variant='h5' color='white' pb={5} pl={3} pr={3} >
                North County Hospitals and Institutions (North County H&I) is a volunteer organization whose mission is to carry the
                Alcoholics Anonymous (AA) message to those who still suffer and cannot get to an AA meeting.
              </Typography>
              <Typography variant='h5' color='white' pb={5} pl={3} pr={3} >
                Our core service is providing AA volunteer panels to treatment and correctional facilities in North San Diego county. Panels
                are made up of AA volunteers who visit facilities on a weekly basis to share their individual stories of experience, strength and hope.
              </Typography>
              <Typography variant='h5' color='white' pb={5} pl={3} pr={3} >
                We are a 501(c)(3) charitable non-profit organization registered as North County Area Institutions Committee (NCAIC).
                We are funded by AA members through their AA group contributions and by individual contributions made to our Green Can
                program that is solely used for AA literature to residents in the facilities we serve
              </Typography>
              <Typography variant='h5' color='white' pb={5} pl={3} pr={3} >
                Visit our Orientation area to learn more about how you can be of service.
              </Typography>
              <Box display="flex" justifyContent="center" >
                <Button variant='contained' size='large' color='secondary' >ORIENTATION</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box pb={7} >
          <Divider />
        </Box>
        <Box textAlign={'center'} pb={7} >
          <Typography variant="h4" color='white' pb={5} >
            Organization Structure
          </Typography>
          <Typography variant="h5" color='white'  textAlign={'left'} pb={5} pl={5} pr={5}>
            Each facility that we take a meeting into has a panel coordinator. This person coordinates the panels and interfaces
            with the facility. There are five panel leaders at every facility. These people are responsible for organizing their
            panel. There can be two to five persons on any panel as determined by the panel leader.
          </Typography>
          <Box
              component="img"
              sx={{ height: '100%', width: '100%' , margin: 'auto' }}
              alt="Panel Organization."
              src={require('../../resources/images/panel_organization.png')}
            />
        </Box>
      </Container>
      <Container sx={{backgroundColor: nchandiTheme.handiDarkGreen }}>
        <Box textAlign={'left'}  pb={7}>
          <Typography variant="h3" color={'white'} textAlign={'center'} pb={5} pl={5} pr={5}>
            COMMITTE BOARD MEETING
          </Typography>
          <Box display='flex' sx={{ flexDirection: 'row' }}>
            <Box display='flex' sx={{ flexDirection: 'column' }}>
              <Typography variant="h4" color={'white'} pb={5} pl={5} pr={5}>
                All Committee Board meetings are held at:
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                North County Alano Club, 4198 Mission Ave, Oceanside, 92057
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                The third Saturday of every month, directly following an orientation session.
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                Schedule:
                9:00am - 9:45am Orientation Session
                9:45am - 11:00am Committee Board Meeting
              </Typography>
            </Box>
            <Box display="flex" sx={{ flexDirection: 'column' }} pb={7}>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                Committee Board meetings are held to conduct the business of North County H&I.
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                Board meetings consist of reports from each of our sub-committee chairpersons. They report on the status of our efforts in each of these areas:
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                Facilities - our service to the residents and the facilities where we take panels.
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                New Members - welcoming new committee members to AA H&I service work.
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                Librarian - distributing AA literature to the residents of the facilities we serve.
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                Technology - using technology to share the message of AA while keeping within the traditions of AA.
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                So Cal H&I - sharing and learning from other H&I committees in our region.
              </Typography>
              <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
                Treasurer - maintaining corporate proverty and financial prudence.
              </Typography>
            </Box>
          </Box>
          <Typography variant="h4" color={'white'} textAlign={'center'} pb={5} pl={5} pr={5}>
              Please Come Join Us!
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default About;