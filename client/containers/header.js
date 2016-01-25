import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Header from '../components/Header/index.jsx';

export const composer = ({Meteor}, onData) => {
  const user = Meteor.user();
  onData(null, {user});
};

export const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  FlowRouter: context.FlowRouter,
  logout: actions.auth.logout,
  gotoUser: actions.layout.gotoUser,
  gotoDocumentIndex: actions.layout.gotoDocumentIndex,
  gotoDocumentAdd: actions.layout.gotoDocumentAdd,
  gotoTeamAdd: actions.layout.gotoTeamAdd
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Header);
