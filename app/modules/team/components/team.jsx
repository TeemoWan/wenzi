import React from 'react';

const Team = React.createClass({
  render() {
    const {team} = this.props;

    return (
      <div id='team'>{team.name}</div>
    );
  }
});

export default Team;
