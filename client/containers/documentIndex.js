import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import DocumentIndex from '../components/DocumentIndex/index.jsx';

export const composer = ({Meteor, Collections}, onData) => {
  const handle = Meteor.subscribe('documents', 20);
  const loading = !handle.ready();
  let documents = [];

  if (!loading) {
    documents = Collections.Documents.find({}, {sort: {createdAt: -1}, limit: 20}).fetch();

    documents.forEach(document => {
      if (document.owner.ownerType === 'user') {
        document.owner.user = Collections.Users.findOne({_id: document.owner.ownerId});
      } else {
        document.owner.team = Collections.Teams.findOne({_id: document.owner.ownerId});
      }
    });
  }

  onData(null, {loading, documents});
};

export const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  FlowRouter: context.FlowRouter,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentIndex);
