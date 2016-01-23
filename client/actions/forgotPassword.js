export default {
  forgotPassword({Meteor, LocalState, FlowRouter}, email) {
    if (email === '') {
      return LocalState.set('FORGOTPASSWORD_ERROR', '邮箱地址必须填写');
    }


  },

  clearForgotPassword({LocalState}) {
    LocalState.set('FORGOTPASSWORD_ERROR', null);
    LocalState.set('FORGOTPASSWORD_FETCHING', false);
  }
};
