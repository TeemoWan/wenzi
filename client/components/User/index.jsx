import React from 'react';

const User = React.createClass({
  render() {
    const {user, loading} = this.props;

    return (
      <div className='ui main container' id='content'>
        {loading
          ? <div className='ui active large centered loader'></div>
          : <span>{user.username}</span>}
      </div>
    )
  }
});

export default User;
