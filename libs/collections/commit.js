const CommitSchema = new SimpleSchema({
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
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  // 提交内容
  comment: {
    type: String,
    label: '提交内容',
    max: 1000
  },
  // 提交状态，用来区分：正在编辑：edit、正在审批：approval、审批通过：finish；
  status: {
    type: String
  },
  // 提交的内容，树形结构
  'commit.tree': {
    type: Object,
    blackbox: true
  },
  // 提交后的快照
  'snapshot.tree': {
    type: Object,
    blackbox: true
  },
  // 提交后的快照，目录结构
  'snapshot.directory': {
    type: Object,
    blackbox: true
  },
  // 提交后的快照，所有结点
  'snapshot.nodes': {
    type: Object,
    blackbox: true
  },
  // 提交统计
  'statistics.chapterCount': {
    type: Number,
    autoValue: function () {
      return 0;
    }
  },
  'statistics.addCount': {
    type: Number,
    autoValue: function () {
      return 0;
    }
  },
  'statistics.deleteCount': {
    type: Number,
    autoValue: function () {
      return 0;
    }
  }
});

export const Commits = new Mongo.Collection('commits');
Commits.attachSchema(CommitSchema);

Commits.allow({
  'insert': function (userId, commit) {
    return true;
  },
  'update': function (userId, commit) {
    return false;
  },
  'remove': function (userId, commit) {
    return false;
  }
});