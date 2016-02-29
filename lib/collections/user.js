import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const UserSchema = new SimpleSchema({
  username: {
    type: String,
    label: '用户名',
    regEx: /^[a-zA-Z0-9_\u4e00-\u9fa5-]{2,16}$/
  },
  emails: {
    type: [ Object ]
  },
  'emails.$.address': {
    type: String,
    label: '邮箱地址',
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  createdAt: {
    type: Date,
    label: '注册时间'
  },
  // 个性域名, 在url中不使用汉字,大写字母
  domain: {
    type: Object,
    label: '个性域名',
    optional: true,
    regEx: /^[a-z0-9_-]{4,16}$/
  },
  profile: {
    type: Object,
    label: '简介',
    optional: true,
    blackbox: true
  },
  /*
   role: {
   type: [String],
   label: '角色'
   },
   */
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  documentCount: {
    type: Number,
    label: '文档数',
    defaultValue: 0
  },
  questionCount: {
    type: Number,
    label: '问题数',
    defaultValue: 0
  },
  notesCount: {
    type: Number,
    label: '笔记数',
    defaultValue: 0
  }
});

let Users = Meteor.users;
Users.attachSchema(UserSchema);

export default Users;
