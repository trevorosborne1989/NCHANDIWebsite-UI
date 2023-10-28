import React from 'react';
import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import EnhancedTabs from '../EnhancedTabs/EnhancedTabs';
import { nchandiTheme } from '../../App';
import PanelMaterial from '../PanelMaterial/PanelMaterial';

const AdminDashboard = () => {

  const tabLabels = [
    "Panel Material",
    "General Resource",
    "Monthly Report",
    "Announcement",
    "Archived Report"
  ];
  const components = [
    <PanelMaterial/>
    ];
  const style = { borderBottom: 3, borderColor: 'divider', color: nchandiTheme.handiYellow };

  const generateTabsConfig = (direction, tabLabels, components, style) => ({
    direction: direction,
    tabLabels: tabLabels,
    components: components,
    style: style
  });

  const tabConfig = generateTabsConfig('horizontal', tabLabels, components, style);

  return (
    <>
      <Grid Grid container sm={12} textAlign={'center'} justifyContent={'center'} pb={3}>
        <Grid sm={10}>
          <Typography variant="h4" color={'white'} >
            Admin Dashboard
          </Typography>
        </Grid>
      </Grid>
      <Grid container sm={12} justifyContent={'center'}>
        <Grid sm={12}>
          <EnhancedTabs 
            {...tabConfig}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default AdminDashboard;