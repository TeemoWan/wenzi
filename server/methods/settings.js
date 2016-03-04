import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import User from '/lib/user';

export default function () {
  Meteor.methods({
    'settings.domain'(domain) {
      check(domain, String);

      let user = Meteor.users.findOne({_id: this.userId});
      user.set({domain});

      if (!domain) {
        throw new Meteor.Error('domainEmpty', '个性域名必须填写');
      }

      if (!user.validate('domain')) {
        throw new Meteor.Error('domainRegexError', '个性域名为4到20位英文字符、数字、下划线或减号');
      }

      if (Meteor.users.findOne({domain})) {
        throw new Meteor.Error('domainExist', '此个性域名已经被占用');
      }

      user.save();
      return user;
    }
  });
}
