import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import ForgotPassword from '../components/ForgotPassword/index.jsx';

export const composer = ({LocalState, clearForgotPassword}, onData) => {
  const error = LocalState.get('FORGOTPASSWORD_ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component
  return clearForgotPassword;
};

export const depsMapper = (context, actions) => ({
  FlowRouter: context.FlowRouter,
  LocalState: context.LocalState,
  forgotPassword: actions.forgotPassword.forgotPassword,
  clearForgotPassword: actions.forgotPassword.clearForgotPassword
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ForgotPassword);
