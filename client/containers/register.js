import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Register from '../components/Register/index.jsx';

export const composer = ({LocalState, clearRegiser}, onData) => {
  const error = LocalState.get('REGISTER_ERROR');
  const registering = LocalState.get('REGISTER_REGISTERING');
  onData(null, {error, registering});

  // clear state when unmounting the component
  return clearRegiser;
};

export const depsMapper = (context, actions) => ({
  FlowRouter: context.FlowRouter,
  LocalState: context.LocalState,
  register: actions.register.register,
  clearRegiser: actions.register.clearRegiser
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Register);
