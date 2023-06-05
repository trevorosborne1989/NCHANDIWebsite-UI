import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Login = () => {


    return (
        <Container>
          <Box>
            <Typography variant='h2'>
              Login
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5'>
              Please Login
            </Typography>
          </Box>
          <Box>
            <Typography variant='h3'>
              Lgin for Admin's only
            </Typography>
          </Box>
        </Container>
    )
}

export default Login;