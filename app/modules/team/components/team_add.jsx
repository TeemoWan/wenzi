import React from 'react';
import classNames from 'classnames';

const TeamAdd = React.createClass({
  render() {
    const {processing, error} = this.props;

    return (
      <div className='ui grid' id='team-add'>
        <div className='two wide column'></div>
        <div className='twelve wide column'>
          <form className={classNames('ui', 'form', {error: Boolean(error)})} onSubmit={this.handleSubmit}>
            <h2 className='ui dividing header'>创建团队</h2>
            {error && <div className='ui error message'><p>{error}</p></div>}
            <div className='field'>
              <label>团队名</label>
              <input type='text' ref='name' placeholder='团队名'/>
            </div>
            <div className='field'>
              <label>团队域名</label>
              <div className='ui labeled input'>
                <div className='ui label'>https://wenzi.com/user/</div>
                <input type='text' ref='domain' placeholder='团队域名'/>
              </div>
            </div>
            <div className='field'>
              <label>团队简介</label>
              <textarea type='text' ref='summary' placeholder='团队简介...' rows='3'/>
            </div>
            {processing ?
            <button className='ui teal loading disabled button'>&nbsp;</button> :
            <button className='ui teal button' type='submit'>创建团队</button>}
          </form>
        </div>
        <div className='two wide column'></div>
      </div>
    );
  },

  handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const {teamAdd} = this.props;
    const {name, domain, summary} = this.refs;

    teamAdd(name.value.trim(), domain.value, summary.value);
  }
});

export default TeamAdd;
