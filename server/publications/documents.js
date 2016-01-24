import Collections from '/libs/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';

Meteor.publish('document', function(id) {
  check(id, String);
  return Collections.Documents.find({_id: id});
});

Meteor.publish('documents', function(limit) {
  let documents,
    users = [],
    teams = [];

  documents = Collections.Documents.find({}, {sort: {createdAt: -1}, limit: limit});

  documents.forEach(function(document){
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
