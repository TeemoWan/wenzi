import Team from '/lib/team';

export default {
  teamAdd({Meteor, LocalState, FlowRouter}, name, summary) {
    let team = new Team();
    team.set({name, summary});

    if (!name) {
      return LocalState.set('TEAM_ADD_ERROR', '团队名必须填写');
    }

    if (!team.validate(name)) {
      return LocalState.set('TEAM_ADD_ERROR', '团队名过长,不要超过30字符');
    }

    if (!team.validate(summary)) {
      return LocalState.set('TEAM_ADD_ERROR', '团队简介过长,不要超过1000字符');
    }

    LocalState.set('TEAM_ADD_ERROR', null);
    LocalState.set('TEAM_ADD_PROCESSING', true);

    Meteor.call('team.add', name, summary, (err, res) => {
      LocalState.set('TEAM_ADD_PROCESSING', false);

      if (err) {
        return LocalState.set('TEAM_ADD_ERROR', err.reason);
      }

      FlowRouter.go(`/team/${res._id}`);
    });
  },

  clearTeamAdd({LocalState}) {
    LocalState.set('TEAM_ADD_ERROR', null);
    LocalState.set('TEAM_ADD_PROCESSING', false);
  }
};
