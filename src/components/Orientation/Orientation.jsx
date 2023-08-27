import React from 'react';
import { Box, Divider, Typography, List, ListItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { nchandiTheme } from '../../App';

const Orientation = () => {
    return (
      <Grid sm={12} container spacing={1} justifyContent={'center'} >
        <Grid sm={12} container textAlign={'center'} justifyContent={'center'} pb={7}>
          <Grid sm={12} py={3} pb={7} >
            <Typography variant="h3" color={'white'} >
              Orientation
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Divider sx={{background: 'white'}}/>
          </Grid>
        </Grid>
        <Grid sm={9} justifyContent={'center'} pb={7}>
          <Typography variant="h5" color={'white'}>
            Are you interested in joining H&I? Service work through Hospital
            and Institutions is a rewarding way to spend your time. Being a
            panel member, you will go into facilities around San Diego
            carrying the message of hope and freedom to the still suffering
            alcoholic. To get started there's just a few things you need to
            do. Please use this page as a resource for the steps you need to
            take to become a panel member. We look forward to meeting you soon.
          </Typography>
        </Grid>
        <Grid container sm={10} md={5} direction={'column'} alignItems={'center'} pb={7}>
          <Grid sm={10} textAlign={'center'}>
            <Typography variant='h4' color='white' pb={5}>
              How-To's of Joining H&I
            </Typography>
          </Grid>
          <Grid sm={10} textAlign={'center'} pb={5}>
            <Box
              component="img"
              sx={{ height: '100%', width: '80%'}}
              src={require('../../resources/images/coordination.png')}
            />
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              1. Verify that you qualify based on the sobriety requirements below.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              2. Attend an orientation - see upcoming dates on this page.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'} pb={5}>
              3. Go to our Panels page - find a panel you would like to join.
            </Typography>
          </Grid>
          <Grid sm={10}>
            <Typography variant='h5' color={'white'}>
              4. Use contact finder to find the right person to speak to about joining the panel.
            </Typography>
          </Grid>
        </Grid>
        <Grid  direction={'column'} pb={7}>
          <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 7, background: 'white', height: '100%' }} />
        </Grid>
        <Grid container sm={10} md={5} direction={'column'} justifyContent={'center'} alignItems={'center'} pb={7}>
          <Grid sm={12} textAlign={'center'}>
            <Typography variant='h4' color={'white'} pb={5}>
              Orientation and Committee Board Meetings
            </Typography>
          </Grid>
          <Grid sm={12} container direction={'row'} textAlign={'center'}>
            <Grid sm={8}>
              <Typography variant='h5' color={'white'}>
                Sat Jul 15 2023
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid sm={10} container pb={7}>
          <Grid sm={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container sm={10} md={5} alignItems={'center'} textAlign={'center'} direction={'column'} pb={10} >
          <Grid sm={12} pb={5}>
            <Typography variant='h4' color='white' >
              Sobriety Requirements
            </Typography>
          </Grid>
          <Grid sm={12} pb={5}>
            <Box
              component="img"
              sx={{ height: '100%', width: '60%' }}
              src={require('../../resources/images/checklist.png')}
            />
          </Grid>
          <Grid sm={12}>
            <Typography variant='h5' color='white' textAlign={'left'}>
            To participate in H&I you must meet the minimum sobriety requirement. While the
            committee never wants this to be a prohibitive factor that keeps someone from
            being of service, we kindly ask that you respect the minimum requirements.
            </Typography>
          </Grid>
        </Grid>
        <Grid container sm={10} md={5} justifyContent={'center'} alignItems={'center'} direction={'column'} pb={7}>
          <Grid sm={10}>
            <List sx={{fontSize: '40px', color: 'white', listStyleType: 'disc', pl: 2, '& .MuiListItem-root': {display: 'list-item',}, }}>
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
          </Grid>
        </Grid>
        <Grid sm={12} container sx={{backgroundColor: nchandiTheme.handiDarkGreen}} py={3} pb={7} >
          <Grid sm={12} pb={10}>
            <Typography variant="h3" color={'white'} textAlign={'center'} >
              Orientation Location
            </Typography>
          </Grid>
          <Grid sm={10} md={6} alignItems={'center'} justifyContent={'center'} textAlign={'center'} pb={7}>
            <Box
              component="img"
              sx={{ height: '90%', width: { sm: '65%', md: '90%' }}}
              src={require('../../resources/images/destination.png')}
              pl={7}
            />
          </Grid>
          <Grid container sm={12} md={5} direction='column' alignItems={'center'} justifyContent={'center'} pb={7}>
            <Grid sm={10}>
              <Typography variant='h4' color='white' pb={5}>
                All orientation meetings are held at:
              </Typography>
            </Grid>
            <Grid sm={10}>
              <Typography variant='h5' color='white' pb={5}>
                North County Alano Club, 4198 Mission Ave, Oceanside, 92057
                The third Saturday of every month
              </Typography>
            </Grid>
            <Grid sm={10}>
              <Typography variant='h5' color='white' pb={5}>
                9:00am - 9:45am General Information and Orientation
              </Typography>
            </Grid>
            <Grid sm={10}>
              <Typography variant='h5' color='white'>
                9:45am - 11:00am Board Meeting
              </Typography>
            </Grid>
          </Grid>
          <Grid container sm={12} alignItems={'center'} justifyContent={'center'} pb={7}>
            <Grid sm={10} pb={7}>
              <Box
                component="img"
                sx={{ height: '100%', width: '100%'}}
                src={require('../../resources/images/Logo-transparancy.png')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
}

export default Orientation;