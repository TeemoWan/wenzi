import update from 'react/lib/update';
import _ from 'lodash';

export default {
  documentAdd({Meteor, LocalState, FlowRouter}, ownerType, ownerId, name, summary) {
    if (name === '') {
      return LocalState.set('DOCUMENT_ADD_ERROR', '文档名必须填写');
    }

    LocalState.set('DOCUMENT_ADD_ERROR', null);
    LocalState.set('DOCUMENT_ADD_PROCESSING', true);

    Meteor.call('documentAdd', ownerType, ownerId, name, summary, (err, res) => {
      if (err) {
        LocalState.set('DOCUMENT_ADD_PROCESSING', false);
        LocalState.set('DOCUMENT_ADD_ERROR', err.reason);
      } else {
        LocalState.set('DOCUMENT_ADD_PROCESSING', false);
        FlowRouter.go(`/document/${res}`);
      }
    });
  },

  clearDocumentAdd({LocalState}) {
    LocalState.set('DOCUMENT_ADD_ERROR', null);
    LocalState.set('DOCUMENT_ADD_PROCESSING', false);
  },

  initDocumentEditTree({LocalState}, tree) {
    LocalState.set('DOCUMENT_EDIT_TREE', tree);
  },

  clearDocumentEditTree({LocalState}) {
    LocalState.set('DOCUMENT_EDIT_TREE', null);
  },

  // direction为节放入章时的方向,0为从上方拖入,1为从下方拖入
  moveNode({LocalState}, dragIndex, hoverIndex, direction=0) {
    //console.log(`moveNode():[${dragIndex}]->[${hoverIndex}]`);

    let newTree;
    let updatedIndex;

    // 取得结点路径
    const getNodePath = (index) => {
      const trimIndex = index.slice(3);

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
    const dragNodePath = getNodePath(dragIndex);
    const hoverNodePath = getNodePath(hoverIndex);
    const [dragNode, hoverNode] = _.at(tree, [dragNodePath, hoverNodePath]);

    // 章到章
    if (dragNode.type === 'chapter' && hoverNode.type === 'chapter') {
      let dragNodeIndex = dragIndex.slice(3);
      let hoverNodeIndex = hoverIndex.slice(3);

      newTree = update(tree, {
        children: {
          $splice: [
            [parseInt(dragNodeIndex), 1],
            [parseInt(hoverNodeIndex), 0, dragNode]
          ]
        }
      });

      updatedIndex = hoverIndex;
    }

    // 节到节
    if (dragNode.type === 'section' && hoverNode.type === 'section') {
      let dragNodeIndex = dragIndex.slice(3).split('.');
      let hoverNodeIndex = hoverIndex.slice(3).split('.');

      // 在同一章内
      if (dragNodeIndex[0] === hoverNodeIndex[0]) {
        newTree = update(tree, {
          children: {
            [parseInt(dragNodeIndex[0])]: {
              children: {
                $splice: [
                  [parseInt(dragNodeIndex[1]), 1],
                  [parseInt(hoverNodeIndex[1]), 0, dragNode]
                ]
              }
            }
          }
        });
      } else {
        newTree = update(tree, {
          children: {
            [parseInt(dragNodeIndex[0])]: {
              children: {
                $splice: [
                  [parseInt(dragNodeIndex[1]), 1]
                ]
              }
            },
            [parseInt(hoverNodeIndex[0])]: {
              children: {
                $splice: [
                  [parseInt(hoverNodeIndex[1]), 0, dragNode]
                ]
              }
            }
          }
        });
      }

      updatedIndex = hoverIndex;
    }

    // 节到章
    if (dragNode.type === 'section' && hoverNode.type === 'chapter') {
      let dragNodeIndex = dragIndex.slice(3).split('.');
      let hoverNodeIndex = hoverIndex.slice(3);

      // 上方拖入
      if (direction == 0) {
        newTree = update(tree, {
          children: {
            [parseInt(dragNodeIndex[0])]: {
              children: {
                $splice: [
                  [parseInt(dragNodeIndex[1]), 1]
                ]
              }
            },
            [parseInt(hoverNodeIndex)]: {
              children: {
                $splice: [
                  [0, 0, dragNode]
                ]
              }
            }
          }
        });
        updatedIndex = `${hoverIndex}.0`;
      } else {
        const lastIndex = hoverNode.children ? hoverNode.children.length : 0;
        newTree = update(tree, {
          children: {
            [parseInt(dragNodeIndex[0])]: {
              children: {
                $splice: [
                  [parseInt(dragNodeIndex[1]), 1]
                ]
              }
            },
            [parseInt(hoverNodeIndex)]: {
              children: {
                $splice: [
                  [lastIndex, 0, dragNode]
                ]
              }
            }
          }
        });

        updatedIndex = `${hoverIndex}.${lastIndex}`;
      }
    }

    LocalState.set('DOCUMENT_EDIT_TREE', newTree);

    return updatedIndex;
  }
};
