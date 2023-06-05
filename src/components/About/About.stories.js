import React from 'react';
import About from './About'


export default {
    title: 'About',
    component: About,
  };

  export const Primary = ({...props}) => {

      return (
        <>
          <About>

          </About>
        </>
      );
    };