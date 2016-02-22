import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import DocumentHeader from '../components/document_header.jsx';

const composer = ({Meteor, Collections, documentId}, onData) => {
  onData(null, {});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  FlowRouter: context.FlowRouter,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentHeader);
