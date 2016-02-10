import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Login from '../components/Login/index.jsx';

const composer = ({LocalState, clearLogin}, onData) => {
  const error = LocalState.get('LOGIN_ERROR');
  const processing = LocalState.get('LOGIN_PROCESSING');
  onData(null, {error, processing});

  return clearLogin;
};

const depsMapper = (context, actions) => ({
  FlowRouter: context.FlowRouter,
  LocalState: context.LocalState,
  login: actions.auth.login,
  clearLogin: actions.auth.clearLogin
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Login);
