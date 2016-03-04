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
  starCount: {
    type: Number,
    defaultValue: 0
  },
  forkCount: {
    type: Number,
    defaultValue: 0
  },
  branchCount: {
    type: Number,
    defaultValue: 0
  },
  commitCount: {
    type: Number,
    defaultValue: 0
  },
  pullCount: {
    type: Number,
    defaultValue: 0
  },
  contributorCount: {
    type: Number,
    defaultValue: 0
  },
  resourceCount: {
    type: Number,
    defaultValue: 0
  },
  issueCount: {
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
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
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
