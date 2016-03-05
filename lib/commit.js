import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Commits} from './collections';

const CommitContent = new SimpleSchema({
  tree: {
    type: Object
  }
});

const CommitSnapshot = new SimpleSchema({
  // 提交后的快照
  tree: {
    type: Object
  },
  // 提交后的快照，目录结构
  directory: {
    type: Object
  },
  // 提交后的快照，所有结点
  nodes: {
    type: Object
  }
});

const CommitStatistics = new SimpleSchema({
  chapter: {
    type: Number,
    defaultValue: 0
  },
  add: {
    type: Number,
    defaultValue: 0
  },
  delete: {
    type: Number,
    defaultValue: 0
  }
});

const Commit = new SimpleSchema({
  // 提交对应的分支id
  branchId: {
    type: String
  },
  committedBy: {
    type: String
  },
  committedAt: {
    type: Date,
    denyUpdate: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  // 提交评论
  comment: {
    type: String,
      label: '提交内容',
      max: 1000
  },
  // 提交状态，用来区分：正在编辑：edit、正在审批：approval、审批通过：finish；
  status: {
    type: String,
    allowedValues: ['edit', 'approval', 'finish']
  },
  // 提交的内容，树形结构
  content: {
    type: CommitContent
  },
  // 提交后的快照
  snapshot: {
    type: CommitSnapshot
  },
  statistics: {
    type: CommitStatistics
  }
});

Commits.attachSchema(Commit);
