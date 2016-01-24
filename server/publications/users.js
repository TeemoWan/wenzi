import Collections from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.publish('user', function(id) {
  check(id, String);
  return Collections.Users.find({_id: id}, {fields: {profile: 1, username: 1, emails: 1, role: 1, createdAt: 1}});
});
