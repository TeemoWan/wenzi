import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import Login from '../components/login.jsx';

const composer = ({LocalState, clearLogin}, onData) => {
  const error = LocalState.get('LOGIN_ERROR');
  const processing = LocalState.get('LOGIN_PROCESSING');
  onData(null, {error, processing});

  // SEO
  DocHead.setTitle('登录文字工匠');
  DocHead.addMeta({
    name: 'description', content: '登录文字工匠'
  });

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
