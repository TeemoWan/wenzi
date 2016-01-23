Meteor.publish('user', function(id) {
  return Meteor.users.find({_id: id}, {fields: {profile: 1, username: 1, emails: 1, role: 1, createdAt: 1}});
});
