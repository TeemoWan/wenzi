import React from 'react';
import NotFound from '/app/modules/core/containers/not_found.js';

const TeamHome = React.createClass({
  render() {
    const {notFound, team} = this.props;

    return (
      notFound ?
        <NotFound/> :
        <div id='team'>{team.name}</div>
    );
  }
});

export default TeamHome;
