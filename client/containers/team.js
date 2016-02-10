import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Loading from '../components/Loading/index.jsx';
import Team from '../components/Team/index.jsx';

const composer = ({Meteor, Collections, teamId}, onData) => {
  if (Meteor.subscribe('team', teamId).ready()) {
    const team = Collections.Teams.findOne(teamId);
    onData(null, {team});
  }
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(Team);
