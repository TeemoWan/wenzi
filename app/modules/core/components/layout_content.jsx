import React from 'react';

const LayoutContent = ({content = () => null }) => (
  <div className='wrapper'>
    {content()}
  </div>
);

export default LayoutContent;
