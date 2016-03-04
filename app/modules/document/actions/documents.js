import {Random} from 'meteor/random';
import update from 'react/lib/update';
import _ from 'lodash';
import Document from '/lib/document';

const generateEditTreeRouter = (tree, path='') => {
  let routes = {};

  _.map(tree.children, (child, n)=>{
    routes[child._id] = `${path}.${n}`;
    return _.assign(routes, generateEditTreeRouter(child, routes[child._id]));
  });

  return routes;
};

export default {
  documentAdd({Meteor, LocalState, FlowRouter}, ownerType, ownerId, name, summary) {
    let document = new Document();
    document.set({name, summary, owner: {ownerType, ownerId}});

    if (!name) {
      return LocalState.set('DOCUMENT_ADD_ERROR', '文档名必须填写');
    }

    if (!document.validate('name')) {
      return LocalState.set('DOCUMENT_ADD_ERROR', '文档名过长,不要超过120字符');
    }

    if (!document.validate('summary')) {
      return LocalState.set('DOCUMENT_ADD_ERROR', '文档简介过长,不要超过1000字符');
    }

    LocalState.set('DOCUMENT_ADD_ERROR', null);
    LocalState.set('DOCUMENT_ADD_PROCESSING', true);

    Meteor.call('document.add', ownerType, ownerId, name, summary, (err, res) => {
      LocalState.set('DOCUMENT_ADD_PROCESSING', false);

      if (err) {
        return LocalState.set('DOCUMENT_ADD_ERROR', err.reason);
      }

      FlowRouter.go(`/document/${res._id}`);
    });
  },

  clearDocumentAdd({LocalState}) {
    LocalState.set('DOCUMENT_ADD_PROCESSING', false);
    LocalState.set('DOCUMENT_ADD_ERROR', null);
  },

  initDocumentEditTree({LocalState}, tree) {
    LocalState.set('DOCUMENT_EDIT_TREE', tree);
    LocalState.set('DOCUMENT_EDIT_TREE_ROUTER', generateEditTreeRouter(tree));
  },

  clearDocumentEditTree({LocalState}) {
    LocalState.set('DOCUMENT_EDIT_TREE', null);
    LocalState.set('DOCUMENT_EDIT_TREE_ROUTER', null);
  },

  // type为拖拽类型, 0为章到章, 1为节到节, 2为节到章
  // direction为光标在对象位置, 0为光标在对象的上半边, 1为光标在对象的下半边
  moveNode({LocalState}, dragId, hoverIndex, type, direction=0) {
    let newTree;

    // 取得结点索引
    const getIndex = (id) => {
      let routes = LocalState.get('DOCUMENT_EDIT_TREE_ROUTER');
      return routes[id];
    };

    // 取得结点路径
    const getPath = (index) => {
      const trimIndex = index.slice(1);

      if (trimIndex.length == 1) {
        return `children[${trimIndex}]`;
      }

      const pathItems =  _.map(trimIndex.split('.'), (key) => {
        return `children[${key}]`;
      });
      return _.join(pathItems, '.');
    };

    // 取得结点
    let tree = LocalState.get('DOCUMENT_EDIT_TREE');
    const dragIndex = getIndex(dragId);
    const drapPath = getPath(dragIndex);
    const [dragNode] = _.at(tree, [drapPath]);

    // 这种情况出现在,从上往下拖拽,跨过至少1个章,拖拽开始索引小于悬浮索引,在悬浮章下部时,会将拖拽章移动到悬浮章
    // 的下边,但由于拖拽章的高度比较窄而悬浮章的高度比较高,移动后鼠标仍然在悬浮章的下部(实际上拖住章已经移动到
    // 悬浮章的下边了),此时通过拖拽开始索引和悬浮章移动以后的索引比较,仍然会调用moveNode函数,所以,此处需要通过
    // 移动以后的索引值再次判断.
    if (type == 1 || type ==2) {
      if (direction == 0 && dragIndex < hoverIndex) {
        return;
      }

      if (direction == 1 && dragIndex > hoverIndex) {
        return;
      }
    }

    // 章到章
    if (type == 1) {
      const dragIndexes = _.trimStart(dragIndex, '.');
      const hoverIndexes = _.trimStart(hoverIndex, '.');
      newTree = update(tree, {
        children: {
          $splice: [
            [parseInt(dragIndexes), 1],
            [parseInt(hoverIndexes), 0, dragNode]
          ]
        }
      });
    }

    // 节到节
    if (type == 2) {
      const dragIndexes = _.trimStart(dragIndex, '.').split('.');
      const hoverIndexes = _.trimStart(hoverIndex, '.').split('.');

      // 在同一章内
      if (dragIndexes[0] === hoverIndexes[0]) {
        newTree = update(tree, {
          children: {
            [parseInt(dragIndexes[0])]: {
              children: {
                $splice: [
                  [parseInt(dragIndexes[1]), 1],
                  [parseInt(hoverIndexes[1]), 0, dragNode]
                ]
              }
            }
          }
        });
      } else {
        newTree = update(tree, {
          children: {
            [parseInt(dragIndexes[0])]: {
              children: {
                $splice: [
                  [parseInt(dragIndexes[1]), 1]
                ]
              }
            },
            [parseInt(dragIndexes[0])]: {
              children: {
                $splice: [
                  [parseInt(hoverIndexes[1]), 0, dragNode]
                ]
              }
            }
          }
        });
      }
    }

    // 节到章
    if (type == 3) {
      const hoverPath = getPath(hoverIndex);
      const [hoverNode] = _.at(tree, [hoverPath]);
      const hoverChildrenLength = hoverNode.children.length;
      const dragIndexes = _.trimStart(dragIndex, '.').split('.');
      const hoverIndexes = _.trimStart(hoverIndex, '.');

      // 节背影在目标章中
      if (_.startsWith(dragIndex, hoverIndex)) {
        return;
      }

      // 上方拖入
      if (direction == 0) {
        newTree = update(tree, {
          children: {
            [parseInt(dragIndexes[0])]: {
              children: {
                $splice: [
                  [parseInt(dragIndexes[1]), 1]
                ]
              }
            },
            [parseInt(hoverIndexes)]: {
              children: {
                $splice: [
                  [0, 0, dragNode]
                ]
              }
            }
          }
        });
      } else {
        newTree = update(tree, {
          children: {
            [parseInt(dragIndexes[0])]: {
              children: {
                $splice: [
                  [parseInt(dragIndexes[1]), 1]
                ]
              }
            },
            [parseInt(hoverIndexes)]: {
              children: {
                $splice: [
                  [hoverChildrenLength, 0, dragNode]
                ]
              }
            }
          }
        });
      }
    }

    LocalState.set('DOCUMENT_EDIT_TREE_ROUTER', generateEditTreeRouter(newTree));
    LocalState.set('DOCUMENT_EDIT_TREE', newTree);
  }
};
