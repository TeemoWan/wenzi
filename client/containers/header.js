import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Header from '../components/Header/index.jsx';

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
