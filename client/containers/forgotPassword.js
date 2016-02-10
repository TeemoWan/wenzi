import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import ForgotPassword from '../components/ForgotPassword/index.jsx';

const composer = ({LocalState, clearForgotPassword}, onData) => {
  const error = LocalState.get('FORGOTPASSWORD_ERROR');
  onData(null, {error});

  return clearForgotPassword;
};

const depsMapper = (context, actions) => ({
  FlowRouter: context.FlowRouter,
  LocalState: context.LocalState,
  forgotPassword: actions.auth.forgotPassword,
  clearForgotPassword: actions.auth.clearForgotPassword
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ForgotPassword);
