import React from 'react';

const LayoutFullScreen = ({content = () => null }) => (
  <div className='wrapper'>
    {content()}
  </div>
);

export default LayoutFullScreen;
