import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Loading from '/app/modules/core/components/loading.jsx';
import Document from '../components/document.jsx';

const composer = ({Meteor, Collections, documentId}, onData) => {
  if (Meteor.subscribe('document', documentId).ready()) {
    let document = Collections.Documents.findOne(documentId);
    let {ownerType, ownerId} = document.owner;
    let owner;

    if (ownerType === 'user') {
      owner= Collections.Users.findOne({_id: ownerId});
    } else {
      owner = Collections.Teams.findOne({_id: ownerId});
    }

    const tree = {
      id: '23427534sadfa',
      type: 'document',
      title: '全球通史 从史前史到21世纪',
      children: [{
        id: '23422634sadfa',
        type: 'chapter',
        title: '第4章 古典文明使欧亚大陆趋于整体化（公元前1000年-公元500年）',
        lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'asdfasd2f234',
        children: [{
          id: '234234sa64dfa',
          type: 'section',
          title: '第一部分 从路德的《九十五条论纲》到玻意耳的“无形的学院”从路德的《九十五条论纲》到玻意耳的“无形的学院”',
          lastCommitComment: 'Extract HTML5 backend into a separate rrepo and update docs with examplesepo and update docs with examples',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdf3asdf234'
        }, {
          id: '23423634sadfa',
          type: 'section',
          title: '第二节',
          lastCommitComment: '[Core] Remove babel-plugin-transform-decorators-legacy',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdfa4sdf234'
        }]
      }, {
        id: '234234s45adfa',
        type: 'chapter',
        title: '第二章',
        lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'asdfas5df234',
        children: [{
          id: '2342341sadfa',
          type: 'section',
          title: '第三部分 从《浮士德》第一部到《走下楼梯的裸女》第二号',
          lastCommitComment: 'Move examples, delete old files and add basic testing example',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdfas6df234'
        }, {
          id: '2342342sadfa',
          type: 'section',
          title: '第二节',
          lastCommitComment: '[Doc Enhancement] Introduce MarkdownElement #2224',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdfa7sdf234'
        }, {
          id: '2342343sadfa',
          type: 'section',
          title: '第三节',
          lastCommitComment: 'build both dev and minified versions to dist',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdf8asdf234'
        }]
      }]
    };

    onData(null, {document, owner, tree});
  }
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(Document);
