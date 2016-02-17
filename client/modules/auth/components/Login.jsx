import React from 'react';
import classNames from 'classnames';

const Login = React.createClass({
  render() {
    const {FlowRouter, error, processing} = this.props;

    return (
      <div id='login'>
        <div className='ui middle aligned center aligned grid'>
          <div className='column'>
            <h2 className='ui teal image header'>
              <img src='/images/logo.png' className='image'/>
              <div className='content'>
                登录文字工匠
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
                    <i className='lock icon'/>
                    <input type='password' ref='password' placeholder='密码' onKeyDown={this.handlePasswordEnterKeyDown}/>
                  </div>
                </div>
                {processing ?
                  <div className='ui fluid large loading button'>&nbsp;</div> :
                  <div className='ui fluid large teal button' onClick={this.handleSubmit}>登录</div>}
              </div>
              {error && <div className='ui error message'><p>{error}</p></div>}
            </form>

            <div className='ui message'>
              新用户? <a href='' onClick={() => FlowRouter.go('/register')}>注册</a> |
              <a href='' onClick={() => FlowRouter.go('/forgotPassword')}>忘记密码</a>
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleEmailEnterKeyDown(event) {
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
    const {login} = this.props;
    const {email, password} = this.refs;

    login(email.value.trim(), password.value);
  }
});

export default Login;