import React from 'react';
import DocumentHeader from '../containers/document_header';
import DocumentStructure from '../containers/document_structure';

const DocumentHome = React.createClass({
  render() {
    const {document, owner, tree} = this.props;

    return (
      <div>
        <DocumentHeader document={document} owner={owner}/>
        <DocumentStructure tree={tree}/>
      </div>
    );
  }
});

export default DocumentHome;
