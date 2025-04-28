import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Divider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import EnhancedTabs from '../EnhancedTabs/EnhancedTabs';
import CommitteeDashboard from '../CommitteeDashboard/CommitteeDashboard';
import PanelMembersDashboard from '../PanelMembersDashboard/PanelMembersDashboard';
import FacilitiesDashboard from '../FacilitiesDashboard/FacilitiesDashboard';
import PanelsDashboard from '../PanelsDashboard/PanelsDashboard';
import PendingVolunteersDashboard from '../PendingVolunteersDashboard/PendingVolunteersDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import Cookies from 'js-cookie';
import { nchandiTheme } from '../../App';


const AdminContainer = () => {
  const history = useNavigate();
  const tempCookie = useState(Cookies.get('tempCookie'));

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

  /**
   *
   */
  const checkAdmin = useCallback(async () => {
    if (!tempCookie)
    {
      history('/unathorized');
    }
  }, [tempCookie, history]);

  /**
   *
   */
  useEffect(() => {
    checkAdmin();
  }, [checkAdmin]);

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