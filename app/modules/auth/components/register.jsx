import React from 'react';
import classNames from 'classnames';

const Register = React.createClass({
  render() {
    const {FlowRouter, error, processing} = this.props;
    const loginPath = FlowRouter.path('auth.login');

    return (
      <div className='wrapper'>
        <div id='register'>
          <div className='ui middle aligned center aligned grid'>
            <div className='column'>
              <h2 className='ui teal image header'>
                <img src='/images/logo.png' className='image'/>
                <div className='content'>
                  注册文字工匠
                </div>
              </h2>

              <form className={classNames('ui', 'large', 'form', {error: Boolean(error)})}>
                <div className='ui stacked segment'>
                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='mail icon'/>
                      <input type='text' ref='email' placeholder='邮箱' onKeyDown={this.handleEmailEnterKeyDown}/>
                    </div>
                  </div>
                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='user icon'/>
                      <input type='text' ref='username' placeholder='用户名' onKeyDown={this.handleUsernameEnterKeyDown}/>
                    </div>
                  </div>
                  <div className='field'>
                    <div className='ui left icon input'>
                      <i className='lock icon'/>
                      <input type='password' ref='password' placeholder='密码'
                             onKeyDown={this.handlePasswordEnterKeyDown}/>
                    </div>
                  </div>
                  {processing ?
                    <div className='ui fluid large loading button'>&nbsp;</div> :
                    <div className='ui fluid large teal button' onClick={this.handleSubmit}>注册</div>}
                </div>
                {error && <div className='ui error message'><p>{error}</p></div>}
              </form>

              <div className='ui message'>
                已经注册了? <a href={loginPath}>登录</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleEmailEnterKeyDown(event) {
    if (event.keyCode === 13) {
      this.refs.username.focus();
    }
  },

  handleUsernameEnterKeyDown(event) {
    if (event.keyCode === 13) {
      this.refs.password.focus();
    }
  },

  handlePasswordEnterKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  },

  handleSubmit() {
    const {register} = this.props;
    const {email, username, password} = this.refs;

    register(email.value.trim(), username.value, password.value);
  }
});

export default Register;
