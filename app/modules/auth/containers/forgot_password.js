import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import ForgotPassword from '../components/forgot_password.jsx';

const composer = ({LocalState, clearForgotPassword}, onData) => {
  const error = LocalState.get('FORGOTPASSWORD_ERROR');
  onData(null, {error});

  // SEO
  DocHead.setTitle('找回密码');
  DocHead.addMeta({
    name: 'description', content: '找回文字工匠密码'
  });

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
