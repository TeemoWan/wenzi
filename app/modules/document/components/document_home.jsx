import React from 'react';
import DocumentHomeHeader from '../containers/document_home_header';
import DocumentHomeStructure from '../containers/document_home_structure';
import NotFound from '/app/modules/core/containers/not_found.js';

const DocumentHome = React.createClass({
  render() {
    const {notFound, document, owner, tree} = this.props;

    return (
      notFound ?
        <NotFound/> :
        <div>
          <DocumentHomeHeader document={document} owner={owner}/>
          <DocumentHomeStructure tree={tree}/>
        </div>
    );
  }
});

export default DocumentHome;
