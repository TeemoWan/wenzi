import {Random} from 'meteor/random';
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const TeemSchema = new SimpleSchema({
  _id: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return Random.id(24);
      }
    }
  },
  name: {
    type: String,
    label: '团队名',
    max: 20
  },
  summary: {
    type: String,
    label: '团队简介',
    max: 1000,
    optional: true
  },
  admins: {
    type: [ String ],
    label: '团队管理员'
  },
  members: {
    type: [ String ],
    label: '团队成员'
  },
  documentCount: {
    type: Number,
    label: '文档数',
    defaultValue: 0
  }
});

let Teams = new Mongo.Collection('teams');
Teams.attachSchema(TeemSchema);

Teams.allow({
  insert: (userId, document) => {
    return true;
  },
  update: (userId, document) => {
    return true;
  },
  remove: (userId, document) => {
    return false;
  }
});

export default Teams;
