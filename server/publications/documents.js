import Collections from '../../libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';

Meteor.publish('document', id => {
  check(id, String);
  return Collections.Documents.find({_id: id});
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
