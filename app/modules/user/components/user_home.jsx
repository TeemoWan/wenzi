import React from 'react';

const UserHome = React.createClass({
  render() {
    const {user} = this.props;

    return (
      <div id='user'>{user.username}</div>
    );
  }
});

export default UserHome;
