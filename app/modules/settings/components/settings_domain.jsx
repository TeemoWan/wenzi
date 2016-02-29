import React from 'react';
import classNames from 'classnames';

const SettingsDomain = React.createClass({
  render() {
    const {user, error, processing} = this.props;

    return (
      <div id='settings-domain'>
        <div className='ui vertical pointing menu' id='settings-domain-menu'>
          <a className='item'>
            基本信息
          </a>
          <a className='active item'>
            个性域名
          </a>
          <a className='item'>
            头像
          </a>
        </div>
        
        <div className='ui segment' id='settings-domain-content'>
          <form className={classNames('ui', 'form', {error: Boolean(error)})}>
            <h2 className='ui dividing header'>个性域名</h2>
            {error && <div className='ui error message'><p>{error}</p></div>}
            <div className='inline field'>
              <label>https://wenzi.com/user/</label>
              <input type='text' ref='domain' placeholder='个性域名' />
            </div>
            {processing ?
            <div className='ui teal loading disabled button'></div> :
            <div className='ui teal button' onClick={this.handleSubmit}>保存</div>}
          </form>
        </div>
      </div>
    );
  }
});

export default SettingsDomain;
