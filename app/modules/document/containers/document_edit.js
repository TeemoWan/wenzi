import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import DocumentEdit from '../components/document_edit.jsx';

const composer = ({Meteor, Collections, WenziSubs, documentId}, onData) => {
  if (WenziSubs.subscribe('documents.single', documentId).ready()) {
    let document = Collections.Documents.findOne(documentId);
    let {ownerType, ownerId} = document.owner;
    let user = Meteor.user();
    let owner;

    if (ownerType === 'user') {
      owner= Meteor.users.findOne({_id: ownerId});
    } else {
      owner = Collections.Teams.findOne({_id: ownerId});
    }

    const tree = {
      _id: '12345678901234567890123a',
      type: 'document',
      title: '全球通史 从史前史到21世纪',
      children: [{
        _id: '12345678901234567890123b',
        type: 'chapter',
        title: '第一章 古典文明使欧亚大陆趋于整体化（公元前1000年-公元500年）',
        summary: '学院”从路德的《九十五条论纲》到玻意耳的“',
        lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'asdfasd2f234',
        children: [{
          _id: '12345678901234567890123c',
          type: 'section',
          title: '第一部分 从路德的《九十五条论纲》到玻意耳的“无形的学院”从路德的《九十五条论纲》到玻意耳的“无形的学院””',
          lastCommitComment: 'Extract HTML5 backend into a separate rrepo and update docs with examplesepo and update docs with examples',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdf3asdf234'
        }]
      }, {
        _id: '12345678901234567890123d',
        type: 'chapter',
        title: '第二章 阅读的层次',
        summary: '每当我面试应聘者时，都会问这样一个问题',
        lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'asdfas5df234',
        children: [{
          _id: '12345678901234567890123e',
          type: 'section',
          title: '第三部分 从《浮士德》第一部到《走下楼梯的裸女》第二号',
          lastCommitComment: 'Move examples, delete old files and add basic testing example',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdfas6df234'
        }, {
          _id: '12345678901234567890123f',
          type: 'section',
          title: '第二节 在数码摄影后期处理中的应用',
          lastCommitComment: '[Doc Enhancement] Introduce MarkdownElement #2224',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdfa7sdf234'
        }, {
          _id: '12345678901234567890123g',
          type: 'section',
          title: '第三节',
          lastCommitComment: 'build both dev and minified versions to dist',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdf8asdf234'
        }]
      }, {
        _id: '12345678901234567890123h',
        type: 'chapter',
        title: '第三章 阅读的第一个层次：基础阅读',
        summary: '商业世界的每一刻都不会重演。下一个比尔? 盖茨不会再开发操作系统，下一个拉里? ',
        lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'adfadf4332',
        children: [{
          _id: '12345678901234567890123i',
          type: 'section',
          title: '第二节 司马相如“琴”定卓文君',
          lastCommitComment: '[Core] Remove babel-plugin-transform-decorators-legacy',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdfa4sdf234'
        }, {
          _id: '12345678901234567890123j',
          type: 'section',
          title: '第三节 司马相如“琴”定卓文君',
          lastCommitComment: '[Core] Remove babel-plugin-transform-decorators-legacy',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdfa4sdf234'
        }, {
          _id: '12345678901234567890123k',
          type: 'section',
          title: '第四节 司马相如“琴”定卓文君',
          lastCommitComment: '[Core] Remove babel-plugin-transform-decorators-legacy',
          lastCommitAt: '2016-01-24',
          lastCommitId: 'asdfa4sdf234'
        }]
      }, {
        _id: '12345678901234567890123l',
        type: 'chapter',
        title: '第四章 商品期货图像的技术分析：一种21世纪的观点',
        summary: '我们想要的那类股票：从长线投资者的角度出发 ',
        lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'adfadf334332',
        children: []
      }]
    };

    onData(null, {document, owner, user, tree});
  }
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections,
  WenziSubs: context.WenziSubs,
  FlowRouter: context.FlowRouter,
  logout: actions.auth.logout
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentEdit);
