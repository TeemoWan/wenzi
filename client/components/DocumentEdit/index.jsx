import React from 'react';
import DocumentEditTree from '../../containers/documentEditTree';
import DocumentEditEditor from '../../containers/documentEditEditor';

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
