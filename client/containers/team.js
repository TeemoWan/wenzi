import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Team from '../components/Team/index.jsx';

export const composer = ({context, teamId}, onData) => {
  const {Meteor, Collections} = context();

  const handle = Meteor.subscribe('team', teamId);
  const loading = !handle.ready();
  const team = Collections.Teams.findOne(teamId);

  onData(null, {team, loading});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Team);
