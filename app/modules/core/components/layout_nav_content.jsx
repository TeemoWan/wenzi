import React from 'react';
import Nav from '../containers/nav';

const LayoutNavContent = ({content = () => null }) => (
  <div className='wrapper'>
    <Nav/>
    <div id='content'>
      <div className='ui main container'>
        {content()}
      </div>
    </div>
  </div>
);

export default LayoutNavContent;
