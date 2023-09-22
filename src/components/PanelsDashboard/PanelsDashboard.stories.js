import React from 'react';
import PanelsDashboard from './PanelsDashboard';


export default {
    title: 'PanelsDashboard',
    component: PanelsDashboard,
  };

  export const Primary = ({...props}) => {
    return (
      <>
        <PanelsDashboard>

        </PanelsDashboard>
      </>
    );
  };