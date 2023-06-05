import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Button } from '@mui/material';

const HomePage = () => {


    return (
        <Container>
          <Box>
            <Typography variant='h2'>
              North County Hospital & Institutions
            </Typography>
          </Box>
          <Box>
          <Button variant="contained" color='primary'>Contained</Button>
          <Button variant="contained" color='secondary'>Contained</Button>
          </Box>
          <Box>
            <Typography variant='h5'>
              Sharing the AA message to those who cannot get to a meeting in North County San Diego
            </Typography>
          </Box>
          <Box>
            <Typography variant='h3'>
              Interested in joining North County H&I?
            </Typography>
          </Box>
        </Container>
    )
}

export default HomePage;