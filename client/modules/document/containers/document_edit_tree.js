import ReactDOM from 'react-dom';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import DocumentEditTree from '../components/document_edit_tree.jsx';

const composer = ({Meteor, Collections, LocalState, clearDocumentEditTree, initTree}, onData) => {
  let tree = LocalState.get('DOCUMENT_EDIT_TREE');

  if (!tree) {
    tree = initTree;
  }

  onData(null, {tree});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections,
  LocalState: context.LocalState,
  initDocumentEditTree: actions.documents.initDocumentEditTree,
  clearDocumentEditTree: actions.documents.clearDocumentEditTree,
  moveNode: actions.documents.moveNode
});

export default _.flow(
  composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
  ),
  DragDropContext(HTML5Backend)
)(DocumentEditTree);
