import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import DocumentEditEditor from '../components/document_edit_editor.jsx';

const composer = ({Meteor, Collections, documentId}, onData) => {
  onData(null, {});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentEditEditor);
