import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import DocumentEdit from '../components/document_edit.jsx';

const composer = ({Meteor, Collections, documentId}, onData) => {

  const tree = {
    _id: '111111111',
    type: 'document',
    title: '全球通史 从史前史到21世纪',
    children: [{
      _id: '2222222222',
      type: 'chapter',
      title: '第一章 古典文明使欧亚大陆趋于整体化（公元前1000年-公元500年）',
      summary: '学院”从路德的《九十五条论纲》到玻意耳的“',
      lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
      lastCommitAt: '2016-01-24',
      lastCommitId: 'asdfasd2f234',
      children: [{
        _id: '33333333333',
        type: 'section',
        title: '第一部分 从路德的《九十五条论纲》到玻意耳的“无形的学院”从路德的《九十五条论纲》到玻意耳的“无形的学院”',
        lastCommitComment: 'Extract HTML5 backend into a separate rrepo and update docs with examplesepo and update docs with examples',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'asdf3asdf234'
      }, {
        _id: '4444444444444444',
        type: 'section',
        title: '第二节',
        lastCommitComment: '[Core] Remove babel-plugin-transform-decorators-legacy',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'asdfa4sdf234'
      }]
    }, {
      _id: '555555555555555',
      type: 'chapter',
      title: '第二章 阅读的层次',
      summary: '每当我面试应聘者时，都会问这样一个问题',
      lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
      lastCommitAt: '2016-01-24',
      lastCommitId: 'asdfas5df234',
      children: [{
        _id: '6666666666666666',
        type: 'section',
        title: '第三部分 从《浮士德》第一部到《走下楼梯的裸女》第二号',
        lastCommitComment: 'Move examples, delete old files and add basic testing example',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'asdfas6df234'
      }, {
        _id: '77777777777777',
        type: 'section',
        title: '第二节',
        lastCommitComment: '[Doc Enhancement] Introduce MarkdownElement #2224',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'asdfa7sdf234'
      }, {
        _id: '8888888888888888',
        type: 'section',
        title: '第三节',
        lastCommitComment: 'build both dev and minified versions to dist',
        lastCommitAt: '2016-01-24',
        lastCommitId: 'asdf8asdf234'
      }]
    }, {
      _id: '999999999999',
      type: 'chapter',
      title: '第三章 阅读的第一个层次：基础阅读',
      summary: '商业世界的每一刻都不会重演。下一个比尔? 盖茨不会再开发操作系统，下一个拉里? ',
      lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
      lastCommitAt: '2016-01-24',
      lastCommitId: 'adfadf4332',
      children: []
    }, {
      _id: '1000000000011',
      type: 'chapter',
      title: '第四章 商品期货图像的技术分析：一种21世纪的观点',
      summary: '我们想要的那类股票：从长线投资者的角度出发 ',
      lastCommitComment: 'Merge pull request #3039 from mbrookes/selectable-enhance',
      lastCommitAt: '2016-01-24',
      lastCommitId: 'adfadf334332',
      children: []
    }]
  };

  onData(null, {tree});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DocumentEdit);
