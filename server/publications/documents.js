import {Documents, Teams} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';

export default function () {
  Meteor.publish('documents.single', _id => {
    check(_id, String);
    let document = Documents.findOne({_id: _id});

    if (!document) {
      return [];
    }

    let {ownerType, ownerId} = document.owner;

    if (ownerType === 'user') {
      return [
        Documents.find({_id: _id}),
        Meteor.users.find({_id: ownerId})
      ];
    } else {
      return [
        Documents.find({_id: _id}),
        Teams.find({_id: ownerId})
      ];
    }
  });

  Meteor.publish('documents.list', limit => {
    let users = [];
    let teams = [];
    let documents = Documents.find({}, {sort: {createdAt: -1}, limit});

    documents.forEach((document) => {
      if (document.owner.ownerType === 'user') {
        users.push(document.owner.ownerId);
      } else {
        teams.push(document.owner.ownerId);
      }
    });

    _.uniq(users);
    _.uniq(teams);

    return [
      documents,
      Meteor.users.find({_id: {$in: users}}),
      Teams.find({_id: {$in: teams}})
    ];
  });
}
