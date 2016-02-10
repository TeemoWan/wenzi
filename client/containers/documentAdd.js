import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Loading from '../components/Loading/index.jsx';
import DocumentAdd from '../components/DocumentAdd/index.jsx';

const composer = ({Meteor, Collections, LocalState, clearDocumentAdd}, onData) => {
  if (Meteor.subscribe('teamsByAdmins', Meteor.userId()).ready()) {
    let error = LocalState.get('DOCUMENT_ADD_ERROR');
    let processing = LocalState.get('DOCUMENT_ADD_PROCESSING');
    let user = Meteor.user();
    let teams = Collections.Teams.find({admins: Meteor.userId()}).fetch();

    onData(null, {error, processing, user, teams});
  }

  return clearDocumentAdd;
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections,
  LocalState: context.LocalState,
  documentAdd: actions.documents.documentAdd,
  clearDocumentAdd: actions.documents.clearDocumentAdd
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(DocumentAdd);
