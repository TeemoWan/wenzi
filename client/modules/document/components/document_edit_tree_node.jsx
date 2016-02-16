import React from 'react';
import classNames from 'classnames';

const DocumentEditTreeNode = React.createClass({
  render() {
    const {item, children, isDragging, connectDragSource, connectDropTarget} = this.props;

    return connectDragSource(connectDropTarget(
      <div className={classNames('item', {chapter: item.type === 'chapter', section: item.type !== 'chapter', dragging: isDragging})}>
        <i className={classNames('icon', {file: item.type === 'chapter', 'file outline': item.type !== 'chapter'})}/>
        <div className='content'>
          <div className='header'>{item.title}</div>
          {children && children.length > 0 && <div className='list'>{children}</div>}
        </div>
      </div>
    ));
  }
});

export default DocumentEditTreeNode;
