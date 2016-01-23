export default {
  create({Meteor, LocalState, FlowRouter}, name, summary) {
    if (!name || !summary) {
      return LocalState.set('SAVING_ERROR', 'name & summary are required!');
    }

    LocalState.set('SAVING_ERROR', null);

    const id = Meteor.uuid();
    // There is a method stub for this in the config/method_stubs
    // That's how we are doing latency compensation
    Meteor.call('documents.create', id, name, summary, (err) => {
      if (err) {
        return LocalState.set('SAVING_ERROR', err.reason);
      }
    });
    FlowRouter.go(`/document/${id}`);
  },

  clearErrors({LocalState}) {
    return LocalState.set('SAVING_ERROR', null);
  }
};
