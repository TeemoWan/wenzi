import Collections from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    teamAdd(name, summary) {
      check(name, String);
      check(summary, String);

      if (name === '') {
        throw new Meteor.Error('nameEmpty', '团队名必须填写');
      }

      if (name.length > 30) {
        throw new Meteor.Error('nameTooLong', '团队名过长,不要超过30字符');
      }

      // TODO: 用户权限判断
      if (Collections.Teams.findOne({name: name})) {
        throw new Meteor.Error('nameExist', '此团队名已经被占用');
      }

      return Collections.Teams.insert({
        name,
        summary,
        admins: [this.userId],
        members: [this.userId]
      });
    }
  });
}
