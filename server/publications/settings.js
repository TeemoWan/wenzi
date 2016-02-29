import Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.publish('settings', () => {
    return Collections.Users.find({_id: this.userId},
      {
        fields: {
          username: 1,
          emails: 1,
          role: 1,
          createdAt: 1,
          profile: 1,
          domain: 1
        }
      });
  });
}
