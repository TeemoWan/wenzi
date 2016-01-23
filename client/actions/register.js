import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export default {
  register({Meteor, LocalState, FlowRouter}, email, username, password) {
    let emailRegExp = SimpleSchema.RegEx.Email;
    let usernameRegExp = new RegExp(/^[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}$/);
    let passwordRegExp = new RegExp(/^[a-zA-Z0-9~!@#$%^&*()_+]{6,16}$/);

    if (email === '') {
      return LocalState.set('REGISTER_ERROR', '邮箱地址必须填写');
    }

    if (!emailRegExp.test(email)) {
      return LocalState.set('REGISTER_ERROR', '邮箱格式不正确');
    }

    if (username === '') {
      return LocalState.set('REGISTER_ERROR', '用户名必须填写');
    }

    if (!usernameRegExp.test(username)) {
      return LocalState.set('REGISTER_ERROR', '用户名格式不正确，可以使用汉字、大小写字母、数字、下划线，长度2到16个字符');
    }

    if (password === '') {
      return LocalState.set('REGISTER_ERROR', '密码必须填写');
    }

    if (!passwordRegExp.test(password)) {
      return LocalState.set('REGISTER_ERROR', '密码格式不正确，必须使用大小写字母、数字、特殊字符，长度6到16个字符');
    }

    LocalState.set('REGISTER_ERROR', null);
    LocalState.set('REGISTER_REGISTERING', true);

    Meteor.call('register', email, username, password, (err, res) => {
      if (err) {
        LocalState.set('REGISTER_REGISTERING', false);
        LocalState.set('REGISTER_ERROR', err.reason);
      } else {
        Meteor.loginWithPassword(email, password, (err, res) => {
          if (err) {
            LocalState.set('REGISTER_REGISTERING', false);
            LocalState.set('REGISTER_ERROR', err.reason);
          } else {
            LocalState.set('REGISTER_REGISTERING', false);
            FlowRouter.go('/');
          }
        });
      }
    });
  },

  clearRegiser({LocalState}) {
    LocalState.set('REGISTER_ERROR', null);
    LocalState.set('REGISTER_REGISTERING', false);
  }
};
