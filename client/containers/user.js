import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import User from '../components/User/index.jsx';

export const composer = ({context, userId}, onData) => {
  const {Meteor, Collections} = context();

  const handle = Meteor.subscribe('user', userId);
  const loading = !handle.ready();
  const user = Collections.Users.findOne(userId);

  onData(null, {user, loading});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(User);
