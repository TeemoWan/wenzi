import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Loading from '../components/Loading/index.jsx';
import User from '../components/User/index.jsx';

const composer = ({Meteor, Collections, userId}, onData) => {
  if (Meteor.subscribe('user', userId).ready()) {
    let user = Collections.Users.findOne(userId);
    onData(null, {user});
  }
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(User);
