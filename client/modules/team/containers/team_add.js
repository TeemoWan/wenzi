import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import TeamAdd from '../components/team_add.jsx';

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
