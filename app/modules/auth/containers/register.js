import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import Register from '../components/register.jsx';

const composer = ({LocalState, clearRegiser}, onData) => {
  const error = LocalState.get('REGISTER_ERROR');
  const processing = LocalState.get('REGISTER_PROCESSING');
  onData(null, {error, processing});

  // SEO
  DocHead.setTitle('欢迎加入文字工匠');
  DocHead.addMeta({
    name: 'description', content: '注册文字工匠账号'
  });

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
