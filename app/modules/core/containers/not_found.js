import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import NotFound from '../components/not_found.jsx';

const composer = ({Meteor}, onData) => {
  onData(null, {});

  // SEO
  DocHead.setTitle('404 文字工匠');
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NotFound);
