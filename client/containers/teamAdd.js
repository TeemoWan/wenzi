import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import TeamAdd from '../components/TeamAdd/index.jsx';

const composer = ({LocalState, clearTeamAdd}, onData) => {
  const error = LocalState.get('TEAM_ADD_ERROR');
  const processing = LocalState.get('TEAM_ADD_PROCESSING');
  onData(null, {error, processing});

  return clearTeamAdd;
};

const depsMapper = (context, actions) => ({
  LocalState: context.LocalState,
  teamAdd: actions.teams.teamAdd,
  clearTeamAdd: actions.teams.clearTeamAdd
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamAdd);
