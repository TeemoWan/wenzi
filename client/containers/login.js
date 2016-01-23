import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Login from '../components/Login/index.jsx';

export const composer = ({LocalState, clearLogin}, onData) => {
  const error = LocalState.get('LOGIN_ERROR');
  const loggingIn = LocalState.get('LOGIN_LOGGINGIN');
  onData(null, {error, loggingIn});

  // clear state when unmounting the component
  return clearLogin;
};

export const depsMapper = (context, actions) => ({
  FlowRouter: context.FlowRouter,
  LocalState: context.LocalState,
  login: actions.login.login,
  clearLogin: actions.login.clearLogin
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Login);
