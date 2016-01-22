const DocumentSchema = new SimpleSchema({
  name: {
    type: String,
    label: '文档名',
    max: 500
  },
  summary: {
    type: String,
    label: '文档简介',
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
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  'owner.ownerType': {
    type: String
  },
  'owner.ownerId': {
    type: String
  },
  // 文档是否是多分支的，此字段来决定是否是多分支的文档。
  /*
   isMultiBranch: {
   type: Boolean
   },
   // 文档是否是否是forked，fork为编辑分支，搜索时这项用来过滤，只有true的文档项目能搜索到。
   isForked: {
   type: Boolean
   },
   */
  starCount: {
    type: Number,
    label: '收藏数',
    defaultValue: 0
  },
  forkCount: {
    type: Number,
    label: '克隆数',
    defaultValue: 0
  },
  branchCount: {
    type: Number,
    label: '分支数',
    defaultValue: 0
  },
  commitCount: {
    type: Number,
    label: '提交数',
    defaultValue: 0
  },
  pullCount: {
    type: Number,
    label: '合入数',
    defaultValue: 0
  },
  contributorCount: {
    type: Number,
    label: '贡献人数',
    defaultValue: 0
  },
  resourceCount: {
    type: Number,
    label: '资源数',
    defaultValue: 0
  },
  issueCount: {
    type: Number,
    label: '缺陷数',
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

export const Documents = new Mongo.Collection('documents');
Documents.attachSchema(DocumentSchema);

Documents.allow({
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
