import {Meteor} from 'meteor/meteor';
import {Astro} from 'meteor/jagi:astronomy';
import {Validators} from 'meteor/jagi:astronomy-validators';
import _ from 'lodash';

export const UserAuth = Astro.Class({
  name: 'UserAuth',
  fields: {
    email: {
      type: 'string'
    },
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  validators: {
    email: Validators.email('邮箱格式不正确!'),
    username: Validators.regexp(/^[a-zA-Z0-9_\u4e00-\u9fa5-]{2,20}$/, '用户名为4到20位中英文字符、数字、下划线或减号'),
    password: Validators.regexp(/^[a-zA-Z0-9~!@#$%^&*()_+]{6,16}$/, '密码格式不正确，必须使用大小写字母、数字、特殊字符，长度6到16个字符')
  }
});

export const Email = Astro.Class({
  name: 'Email',
  fields: {
    address: {
      type: 'string',
      validator: Validators.and([
        Validators.required('邮箱必须填写!'),
        Validators.email('邮箱格式不正确!'),
        Validators.unique('邮箱已经被占用!')
      ])
    },
    verified: {
      type: 'boolean'
    }
  }
});

export const UserProfile = Astro.Class({
  name: 'UserProfile',
  fields: {
    nickname: {
      type: 'string'
    }
  }
});

export const UserStatistics = Astro.Class({
  name: 'UserStatistics',
  fields: {
    documentCount: {
      type: 'number',
      default: 0
    },
    questionCount: {
      type: 'number',
      default: 0
    },
    notesCount: {
      type: 'number',
      default: 0
    }
  }
});

// 考虑哪些字段使用索引
const User = Astro.Class({
  name: 'User',
  collection: Meteor.users,
  fields: {
    emails: {
      type: 'array',
      nested: 'Email',
      validator: Validators.required(),
      default: () => {
        return [];
      }
    },

    username: {
      type: 'string',
      validator: Validators.and([
        Validators.required('用户名必须填写!'),
        Validators.regexp(/^[a-zA-Z0-9_\u4e00-\u9fa5-]{4,20}$/, '用户名为4到20位中英文字符、数字、下划线或减号'),
        Validators.unique('用户名已经被占用!')
      ])
    },

    createdAt: {
      type: 'date',
      immutable: true,
      default: function() {
        return new Date();
      }
    },

    domain: {
      type: 'string',
      optional: true,
      default: () => {
        return '';
      },
      validator: Validators.and([
        Validators.regexp(/^[a-zA-Z0-9_-]{4,20}$/, '个性域名为4到20位英文字符、数字、下划线或减号'),
        Validators.unique('个性域名已经被占用!')
      ])
    },

    profile: {
      type: 'object',
      optional: true,
      nested: 'UserProfile',
      default: () => {
        return {};
      }
    },

    isAdmin: {
      type: 'boolean',
      default: () => {
        return false;
      }
    },

    // 考虑???
    roles: {
      type: 'array',
      default: () => {
        return [];
      }
    },

    statistics: {
      type: 'object',
      nested: 'UserStatistics',
      default: () => {
        return {};
      }
    }
  }
});

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: 'object'
    }
  });
}

export default User;
