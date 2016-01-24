export default {
  documentAdd({Meteor, LocalState, FlowRouter}, ownerType, ownerId, name, summary) {
    if (name === '') {
      return LocalState.set('DOCUMENT_ADD_ERROR', '文档名必须填写');
    }

    LocalState.set('DOCUMENT_ADD_ERROR', null);
    LocalState.set('DOCUMENT_ADD_PROCESSING', true);

    Meteor.call('documentAdd', ownerType, ownerId, name, summary, (err, res) => {
      if (err) {
        LocalState.set('DOCUMENT_ADD_PROCESSING', false);
        LocalState.set('DOCUMENT_ADD_ERROR', err.reason);
      } else {
        LocalState.set('DOCUMENT_ADD_PROCESSING', false);
        FlowRouter.go(`/document/${res}`);
      }
    });
  },

  clearDocumentAdd({LocalState}) {
    LocalState.set('DOCUMENT_ADD_ERROR', null);
    LocalState.set('DOCUMENT_ADD_PROCESSING', false);
  }
};