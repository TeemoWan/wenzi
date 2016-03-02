import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import Loading from '/app/modules/core/components/loading.jsx';
import DocumentIndex from '../components/document_index.jsx';

const composer = ({Meteor, Collections, WenziSubs}, onData) => {
  if (WenziSubs.subscribe('documents.list', 20).ready()) {
    let documents = Collections.Documents.find({}, {sort: {createdAt: -1}, limit: 20}).fetch();

    documents.forEach(document => {
      if (document.owner.ownerType === 'user') {
        document.owner.user = Meteor.users.findOne({_id: document.owner.ownerId});
      } else {
        document.owner.team = Collections.Teams.findOne({_id: document.owner.ownerId});
      }
    });

    onData(null, {documents});

    // SEO
    DocHead.setTitle('文字工匠 文档');
    DocHead.addMeta({
      name: 'description', content: '文字工匠 文档'
    });
  }
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  WenziSubs: context.WenziSubs,
  FlowRouter: context.FlowRouter,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(DocumentIndex);
