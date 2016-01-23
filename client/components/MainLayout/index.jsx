import React from 'react';
import Header from '../../containers/header';
import Footer from '../Footer/index.jsx';

const MainLayout = ({content = () => null }) => (
  <div className='wrapper'>
    <Header/>
    {content()}
    <Footer/>
  </div>
);

export default MainLayout;
