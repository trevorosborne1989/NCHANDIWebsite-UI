import React from 'react';
import { Box, Container, Typography} from '@mui/material';

const Admin = () => {
 
    return (
      <Container>
        <Box textAlign={'center'} py={5} pb={3}>
          <Typography variant="h3" color={'white'} pb={15} pl={3} pr={3} >
            Admin Content
          </Typography>
        </Box>
      </Container>
    )
}

export default Admin; 