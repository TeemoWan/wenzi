export default {
  login({Meteor, LocalState, FlowRouter}, email, password) {
    if (email === '') {
      return LocalState.set('LOGIN_ERROR', '邮箱地址必须填写');
    }

    if (password === '') {
      return LocalState.set('LOGIN_ERROR', '密码必须填写');
    }

    LocalState.set('LOGIN_ERROR', null);
    LocalState.set('LOGIN_LOGGINGIN', true);

    Meteor.loginWithPassword(email, password, (err, res) => {
      if (err) {
        LocalState.set('LOGIN_LOGGINGIN', false);
        LocalState.set('LOGIN_ERROR', err.reason);
      } else {
        LocalState.set('LOGIN_LOGGINGIN', false);
        FlowRouter.go('/');
      }
    });
  },

  clearLogin({LocalState}) {
    LocalState.set('LOGIN_ERROR', null);
    LocalState.set('LOGIN_LOGGINGIN', false);
  }
};
