import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';

const Resources = () => {


    return (
        <Container>
          <Box py={3} pb={7}>
            <Typography variant="h3" color={'white'} textAlign={'center'} pb={5} pl={3} pr={3} >
              Resources
            </Typography>
            <Box pb={7} >
              <Divider sx={{background: 'white'}} />
            </Box>
          </Box>
          
          <Box display={'flex'} sx={{ flexDirection: 'row' }} textAlign={'center'} pb={7} >
            <Box display={'flex'} textAlign={'center'} sx={{ flexDirection: 'column' }} >
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }} pb={5} pl={3} pr={3}>
                Panel Materials
              </Typography>
              <Typography variant='h5' color='white' textAlign={'left'}  pb={3} pl={3} pr={3}>
              Panel materials include any information relevant to H&I panels. Please click on links
              below for PDF files for each piece of information.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
            </Box>
            <Box display={'flex'} textAlign={'center'} sx={{ flexDirection: 'column' }} >
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }} pb={5} pl={3} pr={3}>
                General Resources
              </Typography>
              <Typography variant='h5' color='white' textAlign={'left'}  pb={3} pl={3} pr={3}>
              General resources include information miscellaneous information which you may find helpful.
              Please click on links below for PDF files for each piece of information.
              </Typography>
              <Typography variant='h5' color='white'  pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
              <Typography variant='h5' color='white' pb={3} pl={3} pr={3}>
                Panel Visitors/Guests: 3 Months.
              </Typography>
            </Box>
            <Box display={'flex'} textAlign={'center'} sx={{ flexDirection: 'column' }} >
              <Typography variant='h4' color='white' sx={{ fontWeight: 'bold' }} pb={5} pl={3} pr={3}>
                North County H&I Monthly Reports
              </Typography>
              <Typography variant='h5' color='white' textAlign={'left'}  pb={3} pl={3} pr={3}>
                The links below are for each months (in the current year) committee minutes and financial reports.
                Committee minutes are approved at the following months committee meeting, and financial reports
                are generally made available a few weeks after a committee meeting.
              </Typography>
              <Box display={'flex'} sx={{ flexDirection: 'row' }} textAlign={'center'} pb={7} >
                <Box display={'flex'} textAlign={'center'} sx={{ flexDirection: 'column' }} >
                  <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }} pb={1} pl={3} pr={3}>
                    January
                  </Typography>
                  <Typography variant='h6' color='white' pb={1} >
                    Financial Report
                  </Typography>
                  <Typography variant='h6' color='white' pb={1} >
                    Committee Minutes
                  </Typography>
                </Box>
                <Box display={'flex'} textAlign={'center'} sx={{ flexDirection: 'column' }} >
                  <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }} pb={1} pl={3} pr={3}>
                    May
                  </Typography>
                  <Typography variant='h6' color='white' pb={1} >
                    Financial Report
                  </Typography>
                  <Typography variant='h6' color='white' pb={1} >
                    Committee Minutes
                  </Typography>
                </Box>
                <Box display={'flex'} textAlign={'center'} sx={{ flexDirection: 'column' }} >
                  <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }} pb={1} pl={3} pr={3}>
                    September
                  </Typography>
                  <Typography variant='h6' color='white' pb={3} >
                    Financial Report
                  </Typography>
                  <Typography variant='h6' color='white' pb={1} pl={1} pr={1}>
                    Committee Minutes
                  </Typography>
                </Box>
              </Box>
            </Box>
            
          </Box>
        </Container>
    )
}

export default Resources;