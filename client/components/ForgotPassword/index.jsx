import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

var ForgotPassword = React.createClass({
  render() {
    const {FlowRouter, error} = this.props;

    return (
      <div id='forgot-password'>
        <div className='ui middle aligned center aligned grid'>
          <div className='column'>
            <h2 className='ui teal image header'>
              <img src='/images/logo.png' className='image' />
              <div className='content'>
                找回密码
              </div>
            </h2>
            <form className='ui large form'>
              <div className='ui stacked segment'>
                <div className='field'>
                  <div className='ui left icon input'>
                    <i className='mail icon'/>
                    <input type='text' name='email' placeholder='邮箱' onKeyDown={this.handleEmailEnterKeyDown} />
                  </div>
                </div>
                <div className='ui fluid large teal submit button' onClick={this.handleSubmit}>找回密码</div>
              </div>
              {error ? <div className='ui error message'><p>{error}</p></div> : null}
            </form>

            <div className='ui message'>
              <a href='' onClick={(e) => FlowRouter.go('/login')}>返回登录页</a>
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleEmailEnterKeyDown(event) {
    if(event.keyCode === 13) {
      this.handleSubmit();
    }
  },

  handleSubmit() {
    const {forgotPassword} = this.props;
    const {email} = this.refs;

    forgotPassword(email.value);
  }
});

export default ForgotPassword;
