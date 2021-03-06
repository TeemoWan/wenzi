import React from 'react';
import DocumentEditTreeNode from '../containers/document_edit_tree_node';

const DocumentEditTree = React.createClass({
  componentDidMount() {
    const {initDocumentEditTree, initTree} = this.props;

    initDocumentEditTree(initTree);
  },

  render() {
    const {tree} = this.props;

    return (
      <div id='doc-edit-tree'>
        <div className='ui list'>
          {this.chapterTree(tree)}
        </div>
      </div>
    );
  },

  chapterTree(tree, index='') {
    const {moveNode} = this.props;
    return (
      tree.children && tree.children.map((child, i) => {
        return (<DocumentEditTreeNode index={`${index}.${i}`} id={child._id} key={child._id} type={child.type} item={child} moveNode={moveNode}>
                 {this.chapterTree(child, `${index}.${i}`)}
                </DocumentEditTreeNode>);
      })
    );
  }
});

export default DocumentEditTree;
