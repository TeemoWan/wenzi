export default {
  gotoUser({FlowRouter}, id) {
    FlowRouter.go(`/user/${id}`);
  },

  gotoDocumentIndex({FlowRouter}) {
    FlowRouter.go('/document');
  },

  gotoDocumentAdd({FlowRouter}) {
    FlowRouter.go('/document/add');
  },

  gotoTeamAdd({FlowRouter}) {
    FlowRouter.go('/team/add');
  }
};
