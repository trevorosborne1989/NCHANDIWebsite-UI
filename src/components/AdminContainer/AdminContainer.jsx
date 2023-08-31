import React from 'react';
import { Divider, Typography} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import VerticalTabs from '../VerticalTabs/VerticalTabs';

const AdminContainer = () => {
 
    return (
      <>
        <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} py={3} pb={7}>
          <Grid sm={10}>
            <Typography variant="h3" color={'white'} >
              NCHANDI Website Administration
            </Typography>
          </Grid>
        </Grid>
        <Grid container sm={12} justifyContent={'center'} pb={7}>
          <Grid sm={10}>
            <Divider sx={{background: 'white'}} />
          </Grid>
        </Grid>
        <Grid container sm={12} justifyContent={'center'}>
          <Grid sm={12}>
            <VerticalTabs />
          </Grid>
        </Grid>
      </>
    )
}

export default AdminContainer; 