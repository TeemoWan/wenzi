import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Header from '../components/header.jsx';

const composer = ({Meteor}, onData) => {
  const user = Meteor.user();
  onData(null, {user});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  logout: actions.auth.logout
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Header);
