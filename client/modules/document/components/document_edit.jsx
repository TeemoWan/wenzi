import React from 'react';
import DocumentEditTree from '../containers/document_edit_tree';
import DocumentEditEditor from '../containers/document_edit_editor';

const DocumentEdit = React.createClass({
  render() {
    const {document, owner, tree} = this.props;

    return (
      <div id='doc-edit'>
        <DocumentEditTree initTree={tree}/>
        <DocumentEditEditor />
      </div>
    );
  }
});

export default DocumentEdit;
