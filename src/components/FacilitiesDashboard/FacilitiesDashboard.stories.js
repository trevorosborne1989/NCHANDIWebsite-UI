import React from 'react';
import FacilitiesDashboard from './FacilitiesDashboard';


export default {
    title: 'FacilitiesDashboard',
    component: FacilitiesDashboard,
  };

  export const Primary = ({...props}) => {
    return (
      <>
        <FacilitiesDashboard>

        </FacilitiesDashboard>
      </>
    );
  };