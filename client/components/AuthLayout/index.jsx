import React from 'react';

const AuthLayout = ({content = () => null }) => (
  <div className='wrapper'>
    {content()}
  </div>
);

export default AuthLayout;
