import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Documents} from '/lib/collections';

export default function () {
  Meteor.methods({
    'document.add'(ownerType, ownerId, name, summary) {
      check(ownerType, String);
      check(ownerId, String);
      check(name, String);
      check(summary, String);

      if (!name) {
        throw new Meteor.Error('nameEmpty', '文档名必须填写');
      }

      if (name.length > 120) {
        throw new Meteor.Error('nameTooLong', '文档名过长,不要超过120字符');
      }

      // TODO: 用户权限判断
      if (Documents.findOne({name: name})) {
        throw new Meteor.Error('nameExist', '此文档名已经被占用');
      }

      return Documents.insert({
        name,
        summary,
        createdBy: this.userId,
        owner: {
          ownerType,
          ownerId
        }
      });
    }
  });
}
