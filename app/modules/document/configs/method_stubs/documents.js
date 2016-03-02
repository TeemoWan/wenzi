import {check} from 'meteor/check';

export default function ({Meteor, Collections}) {
  if (Meteor.isClient) {
    Meteor.methods({
      /*
      'document.add'(_id, ownerType, ownerId, name, summary) {
        check(_id, String);
        check(ownerType, String);
        check(ownerId, String);
        check(name, String);
        check(summary, String);

        if (!name) {
          throw new Meteor.Error('nameEmpty', '文档名必须填写');
        }

        if (name.length > 30) {
          throw new Meteor.Error('nameTooLong', '文档名过长,不要超过30字符');
        }

        // TODO: 用户权限判断
        if (Collections.Documents.findOne({name: name})) {
          throw new Meteor.Error('nameExist', '此文档名已经被占用');
        }

        const document = {
          _id, name, summary,
          createdBy: this.userId,
          owner: {ownerType, ownerId},
          saving: true
        };

        Collections.Documents.insert(document);
      }*/
    });
  }
}
