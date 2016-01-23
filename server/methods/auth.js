import {SimpleSchema} from 'meteor/aldeed:simple-schema';

Meteor.methods({
  register(email, username, password) {
    let emailRegExp = SimpleSchema.RegEx.Email;
    let usernameRegExp = new RegExp(/^[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}$/);
    let passwordRegExp = new RegExp(/^[a-zA-Z0-9~!@#$%^&*()_+]{6,16}$/);

    if (email === '') {
      throw new Meteor.Error('emailEmpty', '邮箱地址必须填写');
    }

    if (!emailRegExp.test(email)) {
      throw new Meteor.Error('emailNotValid', '邮箱格式不正确');
    }

    if (Accounts.findUserByEmail(email)) {
      throw new Meteor.Error('emailExist', '此邮箱已经被占用');
    }

    if (username === '') {
      throw new Meteor.Error('usernameEmpty', '用户名必须填写');
    }

    if (!usernameRegExp.test(username)) {
      throw new Meteor.Error('usernameNotValid', '用户名格式不正确，可以使用汉字、大小写字母、数字、下划线，长度2到16个字符');
    }

    if (Accounts.findUserByUsername(username)) {
      throw new Meteor.Error('usernameExist', '此用户名已经被占用');
    }

    if (password === '') {
      throw new Meteor.Error('passwordEmpty', '密码必须填写');
    }

    if (!passwordRegExp.test(password)) {
      throw new Meteor.Error('passwordNotValid', '密码格式不正确，必须使用大小写字母、数字、特殊字符，长度6到16个字符');
    }

    return Accounts.createUser({
      email: email,
      username: username,
      password: password
    });
  }
});
