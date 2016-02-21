import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import Home from '../components/home.jsx';

const composer = ({Meteor}, onData) => {
  onData(null, {});

  // SEO
  DocHead.setTitle('首页 文字工匠');
  DocHead.addMeta({
    name: 'description', content: '文字工匠 文档 阅读'
  });
  DocHead.addMeta({
    name: 'Keywords', content: '文字工匠 文档 阅读'
  });
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
