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
  document: {
    type: Number,
    defaultValue: 0
  },
  question: {
    type: Number,
    defaultValue: 0
  },
  notes: {
    type: Number,
    defaultValue: 0
  }
});

const User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-zA-Z0-9_\u4e00-\u9fa5-]{2,16}$/
  },
  emails: {
    type: Array,
    optional: true
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  domain: {
    type: String,
    optional: true,
    regEx: /^[a-z0-9_-]{4,16}$/
  },
  isAdmin: {
    type: Boolean,
    defaultValue: false
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
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
