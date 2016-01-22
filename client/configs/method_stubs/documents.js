import {Documents} from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'documents.create'(_id, name, summary) {
      check(_id, String);
      check(name, String);
      check(summary, String);

      const createdAt = new Date();
      const document = {
        _id, name, summary, createdAt,
        saving: true
      };
      Documents.insert(document);
    }
  });
}