import React from 'react';
import HomePage from './HomePage';


export default {
    title: 'HomePage',
    component: HomePage,
  };
  
  export const Primary = ({...props}) => {
  
      return (
        <>
          <HomePage>

          </HomePage>
        </>
      );
    };