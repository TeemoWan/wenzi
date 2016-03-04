import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Teams} from './collections';

const TeemStatistics = new SimpleSchema({
  documentCount: {
    type: Number,
    defaultValue: 0
  }
});

const Teem = new SimpleSchema({
  name: {
    type: String,
    regEx: /^[a-zA-Z0-9_\u4e00-\u9fa5-]{2,30}$/
  },
  domain: {
    type: String,
    regEx: /^[a-zA-Z0-9_-]{3,20}$/
  },
  summary: {
    type: String,
    max: 1000,
    optional: true
  },
  admins: {
    type: [String]
  },
  members: {
    type: [String]
  },
  statistics: {
    type: TeemStatistics
  }
});

Teams.attachSchema(Teem);
