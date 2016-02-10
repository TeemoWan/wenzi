import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Register from '../components/Register/index.jsx';

const composer = ({LocalState, clearRegiser}, onData) => {
  const error = LocalState.get('REGISTER_ERROR');
  const processing = LocalState.get('REGISTER_PROCESSING');
  onData(null, {error, processing});

  return clearRegiser;
};

const depsMapper = (context, actions) => ({
  FlowRouter: context.FlowRouter,
  LocalState: context.LocalState,
  register: actions.auth.register,
  clearRegiser: actions.auth.clearRegiser
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Register);
