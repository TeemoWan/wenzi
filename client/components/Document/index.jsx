import React from 'react';

const Document = React.createClass({
  render() {
    const {document, loading} = this.props;

    return (
      <div className='ui main container' id='content'>
        {loading ?
          <div className='ui active medium centered loader'></div> :
          <span>{document.name}</span>}
      </div>
    );
  }
});

export default Document;
