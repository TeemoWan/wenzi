import React from 'react';
import DocumentHomeHeader from '../containers/document_home_header';
import DocumentHomeStructure from '../containers/document_home_structure';

const DocumentHome = React.createClass({
  render() {
    const {document, owner, tree} = this.props;

    return (
      <div>
        <DocumentHomeHeader document={document} owner={owner}/>
        <DocumentHomeStructure tree={tree}/>
      </div>
    );
  }
});

export default DocumentHome;
