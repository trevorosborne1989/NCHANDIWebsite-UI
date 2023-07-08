import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Panels = () => {


    return (
      <Container>
        <Box>
          <Typography variant='h2'>
            Panels
          </Typography>
        </Box>
        <Box>
          <Typography variant='h5'>
            Sign up for a panel
          </Typography>
        </Box>
        <Box>
          <Typography variant='h3'>
            Panel listing...
          </Typography>
        </Box>
      </Container>
    )
}

export default Panels;