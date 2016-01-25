import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import Document from '../components/Document/index.jsx';

export const composer = ({context, documentId}, onData) => {
  const {Meteor, Collections} = context();
  const handle = Meteor.subscribe('document', documentId);
  const loading = !handle.ready();
  const document = Collections.Documents.findOne(documentId);

  onData(null, {document, loading});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Document);
