import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Header from '../components/Header/index.jsx';

export const composer = ({Meteor}, onData) => {
  const user = Meteor.user();
  onData(null, {user});
};

export const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  FlowRouter: context.FlowRouter
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Header);
