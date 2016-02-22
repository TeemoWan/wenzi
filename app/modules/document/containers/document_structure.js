import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import DocumentStructure from '../components/document_structure.jsx';

const composer = ({Meteor, Collections, LocalState}, onData) => {

  onData(null, {});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  FlowRouter: context.FlowRouter,
  Collections: context.Collections,
  LocalState: context.LocalState
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentStructure);
