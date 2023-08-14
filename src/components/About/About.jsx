import React from 'react';
import { Box, Typography, Divider, Card, CardContent, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { nchandiTheme } from '../../App';


const About = () => {

  return (
    <Grid container spacing={1}>
      <Grid container sm={12}  textAlign={'center'} alignContent={'center'} justifyContent={'center'} pb={7}>
        <Grid sm={12} py={3} pb={7}>
          <Typography variant="h3" color={'white'} >
            About Us
          </Typography>
        </Grid>
        <Grid sm={10}>
          <Divider sx={{background: 'white'}}/>
        </Grid>
      </Grid>
      <Grid container alignContent={'center'} justifyContent={'center'} pb={7}>
        <Grid sm={10} md={4} alignContent={'center'} justifyContent={'center'} pb={7} >
          <Card sx={{ backgroundColor: nchandiTheme.handiBlue, width: '100%', margin: 'auto' }} variant="elevation" elevation={10}>
            <CardContent>
              <Box
                component="img"
                sx={{ height: '100%', width: '100%' }}
                alt="NCH&I Icon"
                src={require('../../resources/images/Logo-transparancy.png')}
                pr={2.5}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid container sm={10} md={7} direction={'column'} alignItems={'center'} justifyContent={'center'} >
          <Grid sm={10}>
            <Typography variant='h5' color='white' pb={5}  >
              North County Hospitals and Institutions (North County H&I) is a volunteer organization whose mission is to carry the
              Alcoholics Anonymous (AA) message to those who still suffer and cannot get to an AA meeting.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color='white' pb={5}  >
              Our core service is providing AA volunteer panels to treatment and correctional facilities in North San Diego county. Panels
              are made up of AA volunteers who visit facilities on a weekly basis to share their individual stories of experience, strength and hope.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color='white' pb={5}  >
              We are a 501(c)(3) charitable non-profit organization registered as North County Area Institutions Committee (NCAIC).
              We are funded by AA members through their AA group contributions and by individual contributions made to our Green Can
              program that is solely used for AA literature to residents in the facilities we serve
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color='white' pb={5}  >
              Visit our Orientation area to learn more about how you can be of service.
            </Typography>
          </Grid>
          <Grid sm={12}>
            <Box justifyContent="center" textAlign={'center'} alignItems={'center'} >
              <Button variant='contained' size='large' sx={{ width: 300, backgroundColor: nchandiTheme.handiGreen }}>ORIENTATION</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent={'center'} alignItems={'center'} pb={7}>
        <Grid sm={10} pb={7} >
          <Divider />
        </Grid>
        <Grid sm={10}>
          <Typography variant="h4" color='white' textAlign={'center'} pb={5} >
            Organization Structure
          </Typography>
        </Grid>
        <Grid sm={10}>
          <Typography variant="h5" color='white' pb={5} >
            Each facility that we take a meeting into has a panel coordinator. This person coordinates the panels and interfaces
            with the facility. There are five panel leaders at every facility. These people are responsible for organizing their
            panel. There can be two to five persons on any panel as determined by the panel leader.
          </Typography>
        </Grid>
        <Grid sm={11}>
          <Box
              component="img"
              sx={{ height: '100%', width: '100%' , margin: 'auto' }}
              alt="Panel Organization."
              src={require('../../resources/images/panel_organization.png')}
          />
        </Grid>
      </Grid>
      <Grid container sx={{backgroundColor: nchandiTheme.handiDarkGreen }} justifyContent={'center'}>
        
        <Grid sm={12} py={3} pb={7}>
          <Typography variant="h3" color={'white'} textAlign={'center'} >
            COMMITTE BOARD MEETING
          </Typography>
        </Grid>
        <Grid container sm={10} md={5} direction={'column'}>
          <Grid sm={10}>
            <Typography variant="h4" color={'white'} pb={5} pl={5} pr={5}>
              All Committee Board meetings are held at:
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
              North County Alano Club, 4198 Mission Ave, Oceanside, 92057
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
              The third Saturday of every month, directly following an orientation session.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5} pl={5} pr={5}>
              Schedule:
              9:00am - 9:45am Orientation Session
              9:45am - 11:00am Committee Board Meeting
            </Typography>
          </Grid>
        </Grid>
        <Grid container sm={10} md={5} direction={'column'}>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              Committee Board meetings are held to conduct the business of North County H&I.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              Board meetings consist of reports from each of our sub-committee chairpersons. They report on the status of our efforts in each of these areas:
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              Facilities - our service to the residents and the facilities where we take panels.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              New Members - welcoming new committee members to AA H&I service work.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              Librarian - distributing AA literature to the residents of the facilities we serve.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              Technology - using technology to share the message of AA while keeping within the traditions of AA.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              So Cal H&I - sharing and learning from other H&I committees in our region.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              Treasurer - maintaining corporate proverty and financial prudence.
            </Typography>
          </Grid>
        </Grid>
        <Grid sm={12} py={3} pb={8}>
          <Typography variant="h4" color={'white'} textAlign={'center'} >
            Please Come Join Us!
          </Typography>
        </Grid>
            {/* <Box display='flex' sx={{ flexDirection: 'column' }}>
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
      
          <Typography variant="h4" color={'white'} textAlign={'center'} pb={5} pl={5} pr={5}>
              Please Come Join Us!
          </Typography>
         */}
      </Grid>
    </Grid>
  )
}

export default About;