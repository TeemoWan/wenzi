import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('users.current', () => {
    return Meteor.users.find({_id: this.userId}, {
      fields: {
        username: 1,
        emails: 1,
        isAdmin: 1,
        roles: 1,
        createdAt: 1,
        profile: 1,
        domain: 1,
        statistics: 1
      }
    });
  });

  Meteor.publish('users.single', _id => {
    check(_id, String);
    return Meteor.users.find({_id}, {
      fields: {
        username: 1,
        emails: 1,
        createdAt: 1,
        profile: 1,
        domain: 1,
        statistics: 1
      }
    });
  });
}
