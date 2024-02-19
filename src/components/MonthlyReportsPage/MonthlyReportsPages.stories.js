import React from 'react';
import MonthlyReportsPage from './MonthlyReportsPage';


export default {
    title: 'MonthlyReportsPage',
    component: MonthlyReportsPage,
  };

  export const Primary = ({...props}) => {
    return (
      <>
        <MonthlyReportsPage />
      </>
    );
  };