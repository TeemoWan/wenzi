import React from 'react';
import NotFound from '/app/modules/core/containers/not_found.js';

const UserHome = React.createClass({
  render() {
    const {notFound, user} = this.props;

    return (
      notFound ?
        <NotFound/> :
        <div id='user'>{user.username}</div>
    );
  }
});

export default UserHome;
