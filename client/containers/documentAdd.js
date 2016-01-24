import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import DocumentAdd from '../components/DocumentAdd/index.jsx';

export const composer = ({Meteor, Collections, LocalState, clearDocumentAdd}, onData) => {
  const error = LocalState.get('DOCUMENT_ADD_ERROR');
  const processing = LocalState.get('DOCUMENT_ADD_PROCESSING');
  const handle = Meteor.subscribe('teamsByAdmins', Meteor.userId());
  const user = Meteor.user();
  let loading = false;
  let teams = [];

  if (!handle.ready()) {
    loading = true;
    teams = [];
  } else {
    loading = false;
    teams = Collections.Teams.find({admins: Meteor.userId()}).fetch();
  }

  onData(null, {error, processing, loading, user, teams});

  // clear state when unmounting the component
  return clearDocumentAdd;
};

export const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections,
  LocalState: context.LocalState,
  documentAdd: actions.documents.documentAdd,
  clearDocumentAdd: actions.documents.clearDocumentAdd
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentAdd);
