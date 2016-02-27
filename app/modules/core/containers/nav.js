import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Nav from '../components/nav.jsx';

const composer = ({Meteor}, onData) => {
  const user = Meteor.user();
  onData(null, {user});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  FlowRouter: context.FlowRouter,
  logout: actions.auth.logout
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Nav);
