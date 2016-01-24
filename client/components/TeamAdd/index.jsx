import React from 'react';
import classNames from 'classnames';

const TeamAdd = React.createClass({
  render() {
    const {error, processing} = this.props;
    const formClass = classNames({
      'ui': true,
      'form': true,
      'error': !!error
    });

    return (
      <div className='ui main container' id='content'>
        <div className='ui grid'>
          <div className='two wide column'></div>
          <div className='twelve wide column'>
            <form className={formClass}>
              <h2 className='ui dividing header'>创建团队</h2>
              {error ? <div className='ui error message'><p>{error}</p></div> : null}
              <div className='field'>
                <label>团队名</label>
                <input type='text' ref='name' placeholder='团队名' />
              </div>
              <div className='field'>
                <label>团队简介</label>
                <textarea type='text' ref='summary' placeholder='团队简介...' rows='3' />
              </div>
              {processing
                ? <div className='ui teal loading disabled button'></div>
                : <div className='ui teal button' onClick={this.handleSubmit}>创建团队</div>}
            </form>
          </div>
          <div className='two wide column'></div>
        </div>
      </div>
    )
  },

  handleSubmit() {
    const {teamAdd} = this.props;
    const {name, summary} = this.refs;

    teamAdd(name.value.trim(), summary.value);
  }
});

export default TeamAdd;
