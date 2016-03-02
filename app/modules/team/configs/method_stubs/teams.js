import {check} from 'meteor/check';

export default function ({Meteor, Collections}) {
  if (Meteor.isClient) {
    Meteor.methods({
      /*
      'team.add'(_id, name, summary) {
        check(_id, String);
        check(name, String);
        check(summary, String);


         if (!name) {
         throw new Meteor.Error('nameEmpty', '团队名必须填写');
         }

         if (name.length > 30) {
         throw new Meteor.Error('nameTooLong', '团队名过长,不要超过30字符');
         }

         // TODO: 用户权限判断
         if (Teams.findOne({name: name})) {
         throw new Meteor.Error('nameExist', '此团队名已经被占用');
         }


        const team = {
          _id, name, summary,
          admins: [this.userId],
          members: [this.userId],
          saving: true
        };
        Collections.Teams.insert(team);
      }
      */
    });
  }
}
