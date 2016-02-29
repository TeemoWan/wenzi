import Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('currentUser', () => {
    return Collections.Users.find({_id: this.userId}, {
      fields: {
        username: 1,
        emails: 1,
        role: 1,
        createdAt: 1,
        profile: 1,
        domain: 1
      }
    });
  });

  Meteor.publish('user', id => {
    check(id, String);
    return Collections.Users.find({_id: id}, {
      fields: {
        username: 1,
        emails: 1,
        profile: 1,
        createdAt: 1
      }
    });
  });
}
