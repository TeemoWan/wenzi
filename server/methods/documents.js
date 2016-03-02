import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Documents} from '/lib/collections';
import Document from '/lib/document';

export default function () {
  Meteor.methods({
    'document.add'(ownerType, ownerId, name, summary) {
      check(ownerType, String);
      check(ownerId, String);
      check(name, String);
      check(summary, String);

      let document = new Document();
      document.set({name, summary, createdBy: this.userId, owner: {ownerType, ownerId}});

      if (!name) {
        throw new Meteor.Error('nameEmpty', '文档名必须填写');
      }

      if (!document.validate(name)) {
        throw new Meteor.Error('nameTooLong', '文档名过长,不要超过120字符');
      }

      if (!document.validate(summary)) {
        throw new Meteor.Error('summaryTooLong', '文档简介过长,不要超过1000字符');
      }

      if (Documents.findOne({name: name})) {
        throw new Meteor.Error('nameExist', '此文档名已经被占用');
      }

      document.save();
      return document;
    }
  });
}
