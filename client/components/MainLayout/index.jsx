import React from 'react';
import Header from '../../containers/header';
import Footer from '../Footer/index.jsx';

const MainLayout = ({content = () => null }) => (
  <div className='wrapper'>
    <Header/>
    <div className='ui main container' id='content'>
      {content()}
    </div>
    <Footer/>
  </div>
);

export default MainLayout;
