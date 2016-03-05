import React from 'react';
import classNames from 'classnames';

const SettingsDomain = React.createClass({
  render() {
    const {error, processing, success, domain} = this.props;

    return (
      <div id='settings-domain'>
        <div className='ui vertical pointing menu' id='settings-domain-menu'>
          <a className='item'>基本信息</a>
          <a className='active item'>个性域名</a>
          <a className='item'>头像</a>
        </div>
        
        <div className='ui segment' id='settings-domain-content'>
          <form className={classNames('ui', 'form', {error: Boolean(error)}, {success: success})} onSubmit={this.handleSubmit}>
            <h2 className='ui dividing header'>个性域名</h2>
            {error && <div className='ui error message'><p>{error}</p></div>}
            {success && <div className='ui success message'><p>个性域名修改成功</p></div>}
            <div className='field'>
              <div className='ui labeled input'>
                <div className='ui label'>https://wenzi.com/user/</div>
                <input type='text' ref='domain' placeholder='个性域名' defaultValue={domain}/>
              </div>
            </div>
            {processing ?
            <button className='ui teal loading disabled button'>&nbsp;</button> :
            <button className='ui teal button' type='submit'>保存</button>}
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
