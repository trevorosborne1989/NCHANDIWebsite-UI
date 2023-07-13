import React from 'react';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const Resources = () => {


    return (
        <Box>
          <Box textAlign={'center'} py={3} pb={7}>
            <Typography variant="h3" color={'white'} pb={5} pl={3} pr={3} >
              Resources
            </Typography>
          </Box>

          <Grid container spacing={1} textAlign={'center'} pb={7} >
            <Grid sm={10} md={4} direction='column' textAlign={'center'} >
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }} pb={5} pl={3} pr={3}>
                Panel Materials
              </Typography>
              <Typography variant='h5' color='white' textAlign={'left'}  pb={3} pl={3} pr={3}>
              Panel materials include any information relevant to H&I panels. Please click on links
              below for PDF files for each piece of information.
              </Typography>
              {Array.from(Array(6)).map((_, index) => (
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3} key={index}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              ))}
            </Grid>
            <Grid sm={10} md={4}  direction='column' textAlign={'center'}  >
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }} pb={5} pl={3} pr={3}>
                General Resources
              </Typography>
              <Typography variant='h5' color='white' textAlign={'left'}  pb={3} pl={3} pr={3}>
                General resources include information miscellaneous information which you may find helpful.
                Please click on links below for PDF files for each piece of information.
              </Typography>
              {Array.from(Array(6)).map((_, index) => (
              <Typography variant='h5' color='white'  pb={3} pl={3} pr={3} key={index}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              ))}
            </Grid>
            <Grid container sm={10} md={4} direction='column' textAlign={'center'}  >
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }} pb={5} pl={3} pr={3}>
                North County H&I Monthly Reports
              </Typography>
              <Typography variant='h5' color='white' textAlign={'left'}  pb={3} pl={3} pr={3}>
                The links below are for each months (in the current year) committee minutes and financial reports.
                Committee minutes are approved at the following months committee meeting, and financial reports
                are generally made available a few weeks after a committee meeting.
              </Typography>
              <Grid container xs={12} direction='row' rowSpacing={1} textAlign={'center'}>
                {Array.from(Array(12)).map((_, index) => (
                <Grid sm={10} md={4} textAlign={'center'} key={index} pb={5}>
                  <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }} >
                    January
                  </Typography>
                  <Typography variant='h6' color='white'  >
                    Financial Report
                  </Typography>
                  <Typography variant='h6' color='white'  >
                    Committee Minutes
                  </Typography>
                </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
    )
}

export default Resources;