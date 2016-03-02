import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Loading from '/app/modules/core/components/loading.jsx';
import SettingsDomain from '../components/settings_domain.jsx';

const composer = ({Meteor, Collections, WenziSubs, userId}, onData) => {
  onData(null, {});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  WenziSubs: context.WenziSubs,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(SettingsDomain);