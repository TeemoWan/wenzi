import React from 'react';
import DocumentHeader from '../containers/document_header';
import DocumentStructure from './document_structure.jsx';

const Document = React.createClass({
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

export default Document;
