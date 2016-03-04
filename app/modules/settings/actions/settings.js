export default {
  saveDomain({Meteor, LocalState}, domain) {
    if (!domain) {
      return LocalState.set('SAVE_DOMAIN_ERROR', '个性域名必须填写');
    }

    let user = Meteor.user();
    user.set({domain});

    if (!user.validate('domain')) {
      return LocalState.set('SAVE_DOMAIN_ERROR', '个性域名为4到20位英文字符、数字、下划线或减号');
    }

    LocalState.set('SAVE_DOMAIN_PROCESSING', true);

    Meteor.call('settings.domain', domain, (err) => {
      LocalState.set('SAVE_DOMAIN_PROCESSING', false);

      if (err) {
        LocalState.set('SAVE_DOMAIN_ERROR', err.reason);
      } else {
        LocalState.set('SAVE_DOMAIN_ERROR', null);
      }
    });
  },

  clearDomain({LocalState}) {
    LocalState.set('SAVE_DOMAIN_ERROR', null);
    LocalState.set('SAVE_DOMAIN_PROCESSING', false);
  }
};
