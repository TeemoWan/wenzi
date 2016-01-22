const UserSchema = new SimpleSchema({
  username: {
    type: String,
    label: '用户名',
    regEx: /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}$/
  },
  emails: {
    type: [Object]
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

export const Users = Meteor.users;
Users.attachSchema(UserSchema);
