import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Loading from '/app/modules/core/components/loading.jsx';
import SettingsDomain from '../components/settings_domain.jsx';

const composer = ({Meteor, LocalState, WenziSubs, clearDomain}, onData) => {
  const error = LocalState.get('SAVE_DOMAIN_ERROR');
  const processing = LocalState.get('SAVE_DOMAIN_PROCESSING');
  let domain = '';

  if (WenziSubs.subscribe('users.current').ready()) {
    let user = Meteor.users.findOne({_id: Meteor.userId()});
    console.dir(user);
    domain = user.domain;
  }

  onData(null, {error, processing, domain});

  return clearDomain;
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  LocalState: context.LocalState,
  WenziSubs: context.WenziSubs,
  saveDomain: actions.settings.saveDomain,
  clearDomain: actions.settings.clearDomain
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(SettingsDomain);
