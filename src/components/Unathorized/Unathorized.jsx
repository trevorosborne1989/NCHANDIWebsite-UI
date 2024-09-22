import React from 'react';
import {
  Typography,
  Box,
  Container,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import { nchandiTheme } from '../../App';
import { Warning } from '@mui/icons-material';

const Unathorized = () => {
  const history = useNavigate();

  return (
    <Container>
      <Box textAlign={'center'} py={5} pb={3}>
        <Typography variant="h2" color={nchandiTheme.handiDarkRed} pb={5} pl={3} pr={3} >
          Unathorized!
        </Typography>
        <Warning sx={{ color: nchandiTheme.handiDarkYellow, fontSize: 500 }} />
      </Box>
      <Grid container spacing={1} pb={7} alignContent={'center'} justifyContent={'center'}>
        <Grid sm={8}>
          <Grid container alignContent={'center'} justifyContent={'center'} direction={'column'} >
            <Grid sm={10}>
              <Box pb={3}>
                <Typography variant="h4" color={'white'} textAlign={'center'} >
                  You must be an admin to access this page.
                </Typography>
              </Box>
            </Grid>
            <Box py={3} textAlign={'center'}>
              <Grid sm={12}>
                <Button
                  data-cy='nchandi-return-home-button'
                  variant='contained'
                  sx={{ width: 300, padding: 1, margin: 2, color: nchandiTheme.handiDarkYellow, background: nchandiTheme.handiGrey }}
                  size='large'
                  onClick={() => history('/')}
                >
                  Return Home
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Unathorized;