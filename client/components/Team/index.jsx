import React from 'react';

const Team = React.createClass({
  render() {
    const {team, loading} = this.props;

    return (
      <div className='ui main container' id='content'>
        {loading
          ? <div className='ui active large centered loader'></div>
          : <span>{team.name}</span>}
      </div>
    )
  }
});

export default Team;