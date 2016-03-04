import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';
import {UserAuth} from '/lib/user';

export default function () {
  Meteor.methods({
    'auth.register'(email, username, password) {
      check(email, String);
      check(username, String);
      check(password, String);

      let user = new UserAuth();
      user.set({email, username, password});

      if (!email) {
        throw new Meteor.Error('emailEmpty', '邮箱地址必须填写');
      }

      if (!user.validate('email')) {
        throw new Meteor.Error('emailNotValid', '邮箱格式不正确');
      }

      if (Accounts.findUserByEmail(email)) {
        throw new Meteor.Error('emailExist', '此邮箱已经被占用');
      }

      if (!username) {
        throw new Meteor.Error('usernameEmpty', '用户名必须填写');
      }

      if (!user.validate('username')) {
        throw new Meteor.Error('usernameNotValid', '用户名格式不正确，可以使用汉字、大小写字母、数字、下划线，长度2到16个字符');
      }

      if (Accounts.findUserByUsername(username)) {
        throw new Meteor.Error('usernameExist', '此用户名已经被占用');
      }

      if (!password) {
        throw new Meteor.Error('passwordEmpty', '密码必须填写');
      }

      if (!user.validate('password')) {
        throw new Meteor.Error('passwordNotValid', '密码格式不正确，必须使用大小写字母、数字、特殊字符，长度6到16个字符');
      }

      return Accounts.createUser({email, username, password});
    }
  });
}
