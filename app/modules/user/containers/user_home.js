import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import Loading from '/app/modules/core/components/loading.jsx';
import UserHome from '../components/user_home.jsx';

const composer = ({Meteor, Collections, userId}, onData) => {
  if (Meteor.subscribe('user', userId).ready()) {
    let user = Collections.Users.findOne(userId);
    onData(null, {user});

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
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(UserHome);
