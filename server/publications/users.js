import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('users.current', () => {
    return Meteor.users.find(this.userId);
  });

  Meteor.publish('users.single', _id => {
    check(_id, String);
    return Meteor.users.find(_id);
  });
}
