import React from 'react';
import CommitteeDashboard from './CommitteeDashboard';


export default {
    title: 'CommitteeDashboard',
    component: CommitteeDashboard,
  };

  export const Primary = ({...props}) => {
    return (
      <>
        <CommitteeDashboard>

        </CommitteeDashboard>
      </>
    );
  };