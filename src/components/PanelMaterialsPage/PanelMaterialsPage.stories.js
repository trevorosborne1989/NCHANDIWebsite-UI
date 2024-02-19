import React from 'react';
import PanelMaterialsPage from './PanelMaterialsPage';


export default {
    title: 'PanelMaterialsPage',
    component: PanelMaterialsPage,
  };

  export const Primary = ({...props}) => {
    return (
      <>
        <PanelMaterialsPage />
      </>
    );
  };