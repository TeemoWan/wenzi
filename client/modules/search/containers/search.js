import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Loading from '/client/modules/core/components/loading.jsx';
import Search from '../components/search.jsx';

const composer = ({Meteor, Collections, LocalState}, onData) => {
  onData(null, {});
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
