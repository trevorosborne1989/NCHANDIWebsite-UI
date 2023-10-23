import React from 'react';
import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import EnhancedTabs from '../EnhancedTabs/EnhancedTabs';
import { nchandiTheme } from '../../App';
import CommitteeDashboard from '../CommitteeDashboard/CommitteeDashboard';
import PanelMembersDashboard from '../PanelMembersDashboard/PanelMembersDashboard';
import FacilitiesDashboard from '../FacilitiesDashboard/FacilitiesDashboard';
import PanelsDashboard from '../PanelsDashboard/PanelsDashboard';
import PendingVolunteersDashboard from '../PendingVolunteersDashboard/PendingVolunteersDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

const AdminContainer = () => {

  const tabLabels = [
    "Admin Dashboard",
    "Committee Dashboard",
    "Panel Members Dashboard",
    "Panels Dashboard",
    "Facilities Dashboard",
    "Pending Volunteers"
  ];
  const components = [
    <AdminDashboard/>,
    <CommitteeDashboard/>,
    <PanelMembersDashboard/>,
    <PanelsDashboard/>,
    <FacilitiesDashboard/>,
    <PendingVolunteersDashboard/>
    ];
  const style = { borderRight: 5, borderColor: 'divider', color: nchandiTheme.handiSecondaryWhite };

  const generateTabsConfig = (direction, tabLabels, components, style) => ({
    direction: direction,
    tabLabels: tabLabels,
    components: components,
    style: style
  });

  const tabConfig = generateTabsConfig('vertical', tabLabels, components, style);

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
          <EnhancedTabs 
            {...tabConfig}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default AdminContainer;