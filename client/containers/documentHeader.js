import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import DocumentHeader from '../components/DocumentHeader/index.jsx';

const composer = ({Meteor, Collections, documentId}, onData) => {
  onData(null, {});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentHeader);
