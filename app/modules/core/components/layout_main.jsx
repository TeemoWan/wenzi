import React from 'react';
import Header from '../containers/header';

const MainLayout = ({content = () => null }) => (
  <div className='wrapper'>
    <Header/>
    <div className='ui main container' id='content'>
      {content()}
    </div>
  </div>
);

export default MainLayout;
