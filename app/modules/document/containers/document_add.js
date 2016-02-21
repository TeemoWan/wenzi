import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import Loading from '/app/modules/core/components/loading.jsx';
import DocumentAdd from '../components/document_add.jsx';

const composer = ({Meteor, Collections, LocalState, clearDocumentAdd}, onData) => {
  if (Meteor.subscribe('teamsByAdmins', Meteor.userId()).ready()) {
    let error = LocalState.get('DOCUMENT_ADD_ERROR');
    let processing = LocalState.get('DOCUMENT_ADD_PROCESSING');
    let user = Meteor.user();
    let teams = Collections.Teams.find({admins: Meteor.userId()}).fetch();

    onData(null, {error, processing, user, teams});

    // SEO
    DocHead.setTitle('添加文档');
    DocHead.addMeta({
      name: 'description', content: '添加文档'
    });
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
