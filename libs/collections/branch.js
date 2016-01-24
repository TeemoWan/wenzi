const BranchSchema = new SimpleSchema({
  name: {
    type: String,
    label: '分支',
    max: 50
  },
  summary: {
    type: String,
    label: '分支简介',
    max: 200,
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
  // 分支对应的文档id
  documentId: {
    type: String
  },
  // 此分支是否是文档的主线分支
  isMaster: {
    type: Boolean
  },
  // 此分支的类型，用来区分原文：original；翻译：translation；注释讲解：notes；不同版本：version；
  branchType: {
    type: String
  }
});

let Branches = new Mongo.Collection('branches');
Branches.attachSchema(BranchSchema);

Branches.allow({
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

export default Branches;
