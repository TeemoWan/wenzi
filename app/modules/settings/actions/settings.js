export default {
  settingsDomain({Meteor, LocalState}, domain) {
    if (domain === '') {
      return LocalState.set('SETTINGS_DOMAIN_ERROR', '个性域名必须填写');
    }

    LocalState.set('SETTINGS_DOMAIN_ERROR', null);
    LocalState.set('SETTINGS_DOMAIN_PROCESSING', true);

    Meteor.call('teamAdd', name, summary, (err, res) => {
      if (err) {
        LocalState.set('SETTINGS_DOMAIN_PROCESSING', false);
        LocalState.set('SETTINGS_DOMAIN_ERROR', err.reason);
      } else {
        LocalState.set('SETTINGS_DOMAIN_PROCESSING', false);
      }
    });
  },

  clearTeamAdd({LocalState}) {
    LocalState.set('SETTINGS_DOMAIN_ERROR', null);
    LocalState.set('SETTINGS_DOMAIN_PROCESSING', false);
  }
};
