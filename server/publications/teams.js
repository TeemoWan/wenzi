import {Teams} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('teams.single', _id => {
    this.unblock();

    check(_id, String);
    const selector = {_id};
    return Teams.find(selector);
  });

  Meteor.publish('teams.admins', _id => {
    this.unblock();

    check(_id, String);
    const selector = {admins: _id};
    return Teams.find(selector);
  });
}
