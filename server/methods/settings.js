import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'settings.domain'(domain) {
      const domainRegExp = new RegExp(/^[a-z0-9_-]{3,16}$/);

      check(domain, String);

      if (!domain) {
        throw new Meteor.Error('domainEmpty', '个性域名必须填写');
      }

      if (!domainRegExp.test(domain)) {
        throw new Meteor.Error('domainNotValid', '个性域名为3到16位英文字符、数字、下划线或减号');
      }

      if (Meteor.users.findOne({domain})) {
        throw new Meteor.Error('domainExist', '此个性域名已经被占用');
      }

      return Meteor.users.upsert({_id: this.userId}, {domain});
    }
  });
}
