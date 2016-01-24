export default {
  teamAdd({Meteor, LocalState, FlowRouter}, name, summary) {
    if (name === '') {
      return LocalState.set('TEAM_ADD_ERROR', '团队名必须填写');
    }

    LocalState.set('TEAM_ADD_ERROR', null);
    LocalState.set('TEAM_ADD_PROCESSING', true);

    Meteor.call('teamAdd', name, summary, (err, res) => {
      if (err) {
        LocalState.set('TEAM_ADD_PROCESSING', false);
        LocalState.set('TEAM_ADD_ERROR', err.reason);
      } else {
        LocalState.set('TEAM_ADD_PROCESSING', false);
        FlowRouter.go(`/team/${res}`);
      }
    });
  },

  clearTeamAdd({LocalState}) {
    LocalState.set('TEAM_ADD_ERROR', null);
    LocalState.set('TEAM_ADD_PROCESSING', false);
  }
};
