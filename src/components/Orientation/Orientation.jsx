import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Orientation = () => {
    return (
        <Container>
          <Box>
            <Typography variant='h2'>
             Orientation
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5'>
              Every 3rd Saturday
            </Typography>
          </Box>
          <Box>
            <Typography variant='h3'>
              Pickup a Pamphlet
            </Typography>
          </Box>
        </Container>
    )
}

export default Orientation;