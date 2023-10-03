import React from 'react';
import PendingVolunteersDashboard from './PendingVolunteersDashboard';


export default {
    title: 'PendingVolunteersDashboard',
    component: PendingVolunteersDashboard,
  };

  export const Primary = ({...props}) => {
    return (
      <>
        <PendingVolunteersDashboard>

        </PendingVolunteersDashboard>
      </>
    );
  };