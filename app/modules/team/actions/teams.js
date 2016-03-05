export default {
  teamAdd({Meteor, LocalState, FlowRouter}, name, domain, summary) {
    let nameRegExp = new RegExp(/^[a-zA-Z0-9_\u4e00-\u9fa5-]{2,30}$/);
    let domainRegExp = new RegExp(/^[a-zA-Z0-9_-]{3,20}$/);

    if (!name) {
      return LocalState.set('TEAM_ADD_ERROR', '团队名必须填写');
    }

    if (!nameRegExp.test(name)) {
      return LocalState.set('TEAM_ADD_ERROR', '团队名为2到30位中英文字符、数字、下划线或减号');
    }

    if (!domain) {
      return LocalState.set('TEAM_ADD_ERROR', '团队域名必须填写');
    }

    if (!domainRegExp.test(domain)) {
      return LocalState.set('TEAM_ADD_ERROR', '团队名为3到20位英文字符、数字、下划线或减号');
    }

    if (summary.length > 1000) {
      return LocalState.set('TEAM_ADD_ERROR', '团队简介过长,不要超过1000字符');
    }

    LocalState.set('TEAM_ADD_ERROR', null);
    LocalState.set('TEAM_ADD_PROCESSING', true);

    Meteor.call('team.add', name, domain, summary, (err, res) => {
      LocalState.set('TEAM_ADD_PROCESSING', false);

      if (err) {
        return LocalState.set('TEAM_ADD_ERROR', err.reason);
      }

      FlowRouter.go(`/team/${res}`);
    });
  },

  clearTeamAdd({LocalState}) {
    LocalState.set('TEAM_ADD_ERROR', null);
    LocalState.set('TEAM_ADD_PROCESSING', false);
  }
};
