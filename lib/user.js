import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const UserProfile = new SimpleSchema({
  birthday: {
    type: Date,
    optional: true
  },
  gender: {
    type: String,
    allowedValues: ['Male', 'Female'],
    optional: true
  }
});

const UserStatistics = new SimpleSchema({
  documentCount: {
    type: Number,
    defaultValue: 0
  },
  questionCount: {
    type: Number,
    defaultValue: 0
  },
  notesCount: {
    type: Number,
    defaultValue: 0
  }
});

const User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-zA-Z0-9_\u4e00-\u9fa5-]{2,16}$/
  },
  'emails.$': {
    type: [Object]
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  domain: {
    type: Object,
    optional: true,
    regEx: /^[a-z0-9_-]{4,16}$/
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  profile: {
    type: UserProfile,
    optional: true
  },
  statistics: {
    type: UserStatistics
  }
});

Meteor.users.attachSchema(User);
