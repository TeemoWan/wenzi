import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Teams} from '/lib/collections';
import Team from '/lib/team';

export default function () {
  Meteor.methods({
    'team.add'(name, summary) {
      check(name, String);
      check(summary, String);

      let team = new Team();
      team.set({name, summary, admins: [this.userId], members: [this.userId]});

      if (!name) {
        throw new Meteor.Error('nameEmpty', '团队名必须填写');
      }

      if (!team.validate('name')) {
        throw new Meteor.Error('nameTooLong', '团队名过长,不要超过30字符');
      }

      if (!team.validate('summary')) {
        throw new Meteor.Error('summaryTooLong', '团队简介过长,不要超过1000字符');
      }

      if (Teams.findOne({name: name})) {
        throw new Meteor.Error('nameExist', '此团队名已经被占用');
      }

      team.save();
      return team;
    }
  });
}
