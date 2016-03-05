import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Documents} from './collections';

const DocumentOwner = new SimpleSchema({
  ownerType: {
    type: String,
    allowedValues: ['user', 'team']
  },
  ownerId: {
    type: String
  }
});

const DocumentStatistics = new SimpleSchema({
  star: {
    type: Number,
    defaultValue: 0
  },
  fork: {
    type: Number,
    defaultValue: 0
  },
  branch: {
    type: Number,
    defaultValue: 0
  },
  commit: {
    type: Number,
    defaultValue: 0
  },
  pull: {
    type: Number,
    defaultValue: 0
  },
  contributor: {
    type: Number,
    defaultValue: 0
  },
  resource: {
    type: Number,
    defaultValue: 0
  },
  issue: {
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

const Document = new SimpleSchema({
  name: {
    type: String,
    max: 120
  },
  summary: {
    type: String,
    max: 5000,
    optional: true
  },
  /*
  language: {
    type: String
  },
  */
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  // 文档是否是否是forked，fork为编辑分支，搜索时这项用来过滤，只有false的文档项目能搜索到。
  isForked: {
    type: Boolean,
    optional: true
  },
  owner: {
    type: DocumentOwner
  },
  statistics: {
    type: DocumentStatistics
  }
});

Documents.attachSchema(Document);
