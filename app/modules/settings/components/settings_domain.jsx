import React from 'react';
import classNames from 'classnames';

const SettingsDomain = React.createClass({
  render() {
    const {error, processing, domain} = this.props;

    return (
      <div id='settings-domain'>
        <div className='ui vertical pointing menu' id='settings-domain-menu'>
          <a className='item'>基本信息</a>
          <a className='active item'>个性域名</a>
          <a className='item'>头像</a>
        </div>
        
        <div className='ui segment' id='settings-domain-content'>
          <form className={classNames('ui', 'form', {error: Boolean(error)})} onSubmit={this.handleSubmit}>
            <h2 className='ui dividing header'>个性域名</h2>
            {error && <div className='ui error message'><p>{error}</p></div>}
            <div className='inline field'>
              <label>https://wenzi.com/user/</label>
              <input type='text' ref='domain' placeholder='个性域名' value={domain}/>
            </div>
            {processing ?
            <div className='ui teal loading disabled button'>&nbsp;</div> :
            <div className='ui teal button'>保存</div>}
          </form>
        </div>
      </div>
    );
  },

  handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const {saveDomain} = this.props;
    const {domain} = this.refs;

    saveDomain(domain.value);
  }
});

export default SettingsDomain;
