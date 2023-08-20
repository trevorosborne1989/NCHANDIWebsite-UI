import { Typography, Divider } from "@mui/material";
import React from "react";
import EnhancedTable from "../EnhancedTable/EnhancedTable";
import Grid from '@mui/material/Unstable_Grid2';

const Panels = () => {


  return (
    <>
      
        <Grid container sm={12} textAlign={'center'} justifyContent={'center'} py={3} pb={7}>
          <Grid sm={10}>
            <Typography variant="h3" color={'white'} >
              Panels
            </Typography>
          </Grid>
        </Grid>
        <Grid container sm={12} justifyContent={'center'} pb={7}>
          <Grid sm={10}>
            <Divider sx={{background: 'white'}} />
          </Grid>
        </Grid>
        <Grid container  sm={12} justifyContent={'center'} pb={7}>
          <Grid sm={11}>
            <EnhancedTable />
          </Grid>
        </Grid>
    </>
  )
}

export default Panels;