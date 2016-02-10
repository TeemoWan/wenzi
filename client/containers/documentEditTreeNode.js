import React from 'react';
import ReactDOM from 'react-dom';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';
import {DragSource, DropTarget} from 'react-dnd';
import _ from 'lodash';
import DocumentEditTreeNode from '../components/DocumentEditTreeNode/index.jsx';

const Types = {
  NODE: 'node'
};

const nodeSource = {
  beginDrag(props, monitor, component) {
    return {
      type: props.type,
      index: props.index
    };
  }
};

const nodeTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const dragType = monitor.getItem().type;
    const hoverIndex = props.index;
    const hoverType = props.type;
    let updatedIndex;

    //console.log(`拖拽索引:${dragIndex}, 悬浮索引:${hoverIndex}`);

    // 不替换结点自己
    if (dragIndex === hoverIndex) {
      return;
    }

    // 章在节之上
    if (dragType === 'chapter' && hoverType === 'section') {
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

    // 章在章之上 或者 节在节之上
    if (dragType === hoverType) {
      //console.log(`光标:${clientOffset.y}, 光标距离悬浮顶部:${hoverClientY}, 悬浮顶部:${hoverBoundingRect.top}, 悬浮底部:${hoverBoundingRect.bottom}, 悬浮中值:${hoverMiddleY}`);
      // 向下拖拽
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 向上拖拽
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      //调用移动结点,相当于改变结点顺序
      updatedIndex = props.moveNode(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here! Generally it's better to avoid mutations, but it's good here for the sake of performance to avoid expensive index searches.
      monitor.getItem().index = updatedIndex;
      return;
    }

    // 节在章之上, 这里不用if,因为不再有else
    // 在章内移动节不处理
    if (_.startsWith(dragIndex, hoverIndex)) {
      return;
    }

    // 向下拖拽
    if (dragIndex < hoverIndex) {
      if (hoverClientY > hoverMiddleY) {
        return;
      }

      updatedIndex = props.moveNode(dragIndex, hoverIndex, 0);
      monitor.getItem().index = updatedIndex;
      return;
    }

    // 向上拖拽
    if (dragIndex > hoverIndex) {
      if (hoverClientY < hoverMiddleY) {
        return;
      }

      updatedIndex = props.moveNode(dragIndex, hoverIndex, 1);
      monitor.getItem().index = updatedIndex;
    }
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
