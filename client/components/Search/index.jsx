import React from 'react';

const Search = React.createClass({
  render() {
    return (
      <div className='ui left aligned search item'>
        <div className='ui icon input'>
          <input className='prompt' type='text' placeholder='搜索...'/>
          <i className='search icon'/>
        </div>
        <div className='results'></div>
      </div>
    )
  }
});

export default Search;
