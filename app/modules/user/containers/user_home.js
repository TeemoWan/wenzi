import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import Loading from '/app/modules/core/components/loading.jsx';
import UserHome from '../components/user_home.jsx';

const composer = ({Meteor, WenziSubs, userId}, onData) => {
  if (WenziSubs.subscribe('users.single', userId).ready()) {
    let user = Meteor.users.findOne(userId);
    let notFound = false;

    if (!user) {
      notFound = true;
      return onData(null, {notFound});
    }

    onData(null, {notFound, user});

    // SEO
    DocHead.setTitle(user.username);
    DocHead.addMeta({
      name: 'description', content: user.username
    });
  }
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  FlowRouter: context.FlowRouter,
  WenziSubs: context.WenziSubs
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(UserHome);
