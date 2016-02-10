import React from 'react';
import Header from '../../containers/header';

const FluidLayout = ({content = () => null }) => (
  <div className='wrapper'>
    <Header/>
    <div id='fluid-content'>
      {content()}
    </div>
  </div>
);

export default FluidLayout;
