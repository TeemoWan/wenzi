import React from 'react';
import DocumentEditHeader from '../containers/document_edit_header';
import DocumentEditTree from '../containers/document_edit_tree';
import DocumentEditEditor from '../containers/document_edit_editor';

const DocumentEdit = React.createClass({
  render() {
    const {document, owner, user, tree, logout} = this.props;

    return (
      <div id='doc-edit'>
        <DocumentEditHeader document={document} owner={owner} user={user} logout={logout}/>
        <div id='doc-edit-content'>
          <DocumentEditTree initTree={tree}/>
          <DocumentEditEditor />
        </div>
      </div>
    );
  }
});

export default DocumentEdit;
