import Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('team', id => {
    check(id, String);
    return Collections.Teams.find({_id: id});
  });

  Meteor.publish('teamsByAdmins', id => {
    check(id, String);
    return Collections.Teams.find({admins: id});
  });
}
