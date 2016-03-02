import {UserAuth} from '/lib/user';

export default {
  login({Meteor, LocalState, FlowRouter}, email, password) {
    if (!email || !password) {
      return LocalState.set('LOGIN_ERROR', '邮箱地址及密码必须填写');
    }

    LocalState.set('LOGIN_ERROR', null);
    LocalState.set('LOGIN_PROCESSING', true);

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        LocalState.set('LOGIN_PROCESSING', false);
        LocalState.set('LOGIN_ERROR', err.reason);
      } else {
        LocalState.set('LOGIN_PROCESSING', false);
        FlowRouter.go('/');
      }
    });
  },

  clearLogin({LocalState}) {
    LocalState.set('LOGIN_ERROR', null);
    LocalState.set('LOGIN_PROCESSING', false);
  },

  register({Meteor, LocalState, FlowRouter}, email, username, password) {
    let user = new UserAuth();

    user.set('email', email);
    user.set('username', username);
    user.set('password', password);

    if (!email) {
      return LocalState.set('REGISTER_ERROR', '邮箱地址必须填写');
    }

    if (!user.validate('email')) {
      return LocalState.set('REGISTER_ERROR', '邮箱格式不正确');
    }

    if (!username) {
      return LocalState.set('REGISTER_ERROR', '用户名必须填写');
    }

    if (!user.validate('username')) {
      return LocalState.set('REGISTER_ERROR', '用户名格式不正确，可以使用汉字、大小写字母、数字、下划线，长度2到16个字符');
    }

    if (!password) {
      return LocalState.set('REGISTER_ERROR', '密码必须填写');
    }

    if (!user.validate('password')) {
      return LocalState.set('REGISTER_ERROR', '密码格式不正确，必须使用大小写字母、数字、特殊字符，长度6到16个字符');
    }

    LocalState.set('REGISTER_ERROR', null);
    LocalState.set('REGISTER_PROCESSING', true);

    Meteor.call('register', email, username, password, (err) => {
      if (err) {
        LocalState.set('REGISTER_PROCESSING', false);
        LocalState.set('REGISTER_ERROR', err.reason);
      } else {
        Meteor.loginWithPassword(email, password, (err) => {
          if (err) {
            LocalState.set('REGISTER_PROCESSING', false);
            LocalState.set('REGISTER_ERROR', err.reason);
          } else {
            LocalState.set('REGISTER_PROCESSING', false);
            FlowRouter.go('/');
          }
        });
      }
    });
  },

  clearRegiser({LocalState}) {
    LocalState.set('REGISTER_ERROR', null);
    LocalState.set('REGISTER_PROCESSING', false);
  },

  forgotPassword({Meteor, LocalState, FlowRouter}, email) {
    if (email === '') {
      return LocalState.set('FORGOTPASSWORD_ERROR', '邮箱地址必须填写');
    }


  },

  clearForgotPassword({LocalState}) {
    LocalState.set('FORGOTPASSWORD_ERROR', null);
    LocalState.set('FORGOTPASSWORD_PROCESSING', false);
  },

  logout({Meteor, FlowRouter}) {
    Meteor.logout();
    FlowRouter.go('/');
  }
};
