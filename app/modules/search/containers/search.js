import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import Loading from '/app/modules/core/components/loading.jsx';
import Search from '../components/search.jsx';

const composer = ({Meteor, Collections, LocalState}, onData) => {
  onData(null, {});

  // SEO
  DocHead.setTitle('文字工匠 搜索');
  DocHead.addMeta({
    name: 'description', content: '文字工匠 搜索'
  });
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections,
  LocalState: context.LocalState
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(Search);
