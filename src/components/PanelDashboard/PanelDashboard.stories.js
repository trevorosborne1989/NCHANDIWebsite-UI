import React from 'react';
import PanelMembersDashboard from './PanelDashboard';


export default {
    title: 'PanelMembersDashboard',
    component: PanelMembersDashboard,
  };

  export const Primary = ({...props}) => {
    return (
      <>
        <PanelMembersDashboard>

        </PanelMembersDashboard>
      </>
    );
  };