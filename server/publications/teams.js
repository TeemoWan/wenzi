import Collections from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.publish('team', function(id) {
  check(id, String);
  return Collections.Teams.find({_id: id});
});

Meteor.publish('teamsByAdmins', function(id) {
  check(id, String);
  return Collections.Teams.find({admins: id});
});
