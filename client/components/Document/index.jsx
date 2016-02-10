import React from 'react';
import DocumentHeader from '../../containers/documentHeader';
import DocumentStructure from '../../components/DocumentStructure/index.jsx';

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
