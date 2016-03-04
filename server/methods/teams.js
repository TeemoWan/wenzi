import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Teams} from '/lib/collections';

export default function () {
  Meteor.methods({
    'team.add'(name, domain, summary) {
      let nameRegExp = new RegExp(/^[a-zA-Z0-9_\u4e00-\u9fa5-]{2,30}$/);
      let domainRegExp = new RegExp(/^[a-zA-Z0-9_-]{3,20}$/);

      check(name, String);
      check(summary, String);

      if (!name) {
        throw new Meteor.Error('nameEmpty', '团队名必须填写');
      }

      if (!nameRegExp.test(name)) {
        throw new Meteor.Error('nameNotValid', '团队名为2到30位中英文字符、数字、下划线或减号');
      }

      if (!domain) {
        throw new Meteor.Error('domainEmpty', '团队域名必须填写');
      }

      if (!domainRegExp.test(domain)) {
        throw new Meteor.Error('domainNotValid', '团队域名为3到20位中英文字符、数字、下划线或减号');
      }

      // TODO: 用户权限判断
      if (Teams.findOne({name: name})) {
        throw new Meteor.Error('nameExist', '此团队名已经被占用');
      }

      return Teams.insert({
        name: name,
        domain: domain,
        summary: summary,
        admins: [this.userId],
        members: [this.userId]
      });
    }
  });
}
