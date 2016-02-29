import Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';

export default function () {
  Meteor.publish('document', id => {
    check(id, String);
    let document = Collections.Documents.findOne({_id: id});
    let {ownerType, ownerId} = document.owner;

    if (ownerType === 'user') {
      return [
        Collections.Documents.find({_id: id}),
        Collections.Users.find({_id: ownerId})
      ];
    } else {
      return [
        Collections.Documents.find({_id: id}),
        Collections.Teams.find({_id: ownerId})
      ];
    }
  });

  Meteor.publish('documents', limit => {
    let users = [];
    let teams = [];
    let documents = Collections.Documents.find({}, {sort: {createdAt: -1}, limit});

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
      Collections.Users.find({_id: {$in: users}}),
      Collections.Teams.find({_id: {$in: teams}})
    ];
  });
}
