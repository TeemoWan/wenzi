import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('users.current', () => {
    const selector = {_id: this.userId};
    const response = Meteor.users.find(selector);
    // console.log ('publish users.current _id', this.userId);
    // console.log ('publish users.current response', response);
    return response;
  });

  Meteor.publish('users.single', _id => {
    check(_id, String);
    const selector = {_id};
    const response = Meteor.users.find(selector);
    // console.log ('publish users.single _id', _id);
    // console.log ('publish users.single response', response);
    return response;
  });
}
