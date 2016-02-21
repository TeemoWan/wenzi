import React from 'react';
import ReactDOM from 'react-dom';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DragSource, DropTarget} from 'react-dnd';
import _ from 'lodash';
import DocumentEditTreeNode from '../components/document_edit_tree_node.jsx';

const Types = {
  NODE: 'node'
};

const nodeSource = {
  beginDrag(props, monitor, component) {
    return {
      id: props.id,
      type: props.type
    };
  }
};

const nodeTarget = {
  hover(props, monitor, component) {
    const dragId = monitor.getItem().id;
    const dragType = monitor.getItem().type;
    const hoverId = props.id;
    const hoverIndex = props.index;
    const hoverType = props.type;
    const moveNode = props.moveNode;
    let type;
    let direction;

    // 拖拽结点在阴影结点之上时
    if (dragId === hoverId) {
      return;
    }

    // 拖拽类型
    if (dragType === 'chapter' && dragType === hoverType) {
      type = 1;
    } else if (dragType === 'section' && dragType === hoverType) {
      type = 2;
    } else if (dragType === 'section' && hoverType === 'chapter') {
      type = 3;
    } else {
      return;
    }

    // 光标位置
    const clientOffset = monitor.getClientOffset();

    // 在屏幕上取得悬浮章的大小及方位
    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();

    // 悬浮章的垂直中值
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // 取得光标到悬浮章的顶部距离
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // 在目标的位置, 0为在目标上半部, 1为在目标下半部
    if (hoverClientY < hoverMiddleY) {
      direction = 0;
    } else {
      direction = 1;
    }

    return moveNode(dragId, hoverIndex, type, direction);
  }
};

const composer = ({Meteor, Collections, LocalState}, onData) => {
  onData(null, {});
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections,
  LocalState: context.LocalState
});

export default _.flow(
  composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
  ),
  DropTarget(Types.NODE, nodeTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  })),
  DragSource(Types.NODE, nodeSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(DocumentEditTreeNode);
