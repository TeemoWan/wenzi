import {Random} from 'meteor/random';

const NodeSchema = new SimpleSchema({
  _id: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return Random.id(24);
      }
    }
  },
  hash: {
    type: String
    //max: 40,
  },
  type: {
    type: String
  },
  subType: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    label: 'Title',
    optional: true
  },
  content: {
    type: String,
    label: 'Content',
    optional: true
  },
  subNodes: {
    type: Object,
    blackbox: true,
    optional: true
  },
  tree: {
    type: Object,
    blackbox: true,
    optional: true
  },
  url: {
    type: String,
    optional: true
  },
  target: {
    type: String,
    optional: true
  },
  range: {
    type: String,
    optional: true
  }
});

let Nodes = new Mongo.Collection('nodes');
Nodes.attachSchema(NodeSchema);

Nodes.allow({
  'insert': function (userId, document) {
    return true;
  },
  'update': function (userId, document) {
    return true;
  },
  'remove': function (userId, document) {
    return false;
  }
});

export default Nodes;
