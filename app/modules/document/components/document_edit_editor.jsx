import React from 'react';

const DocumentEditEditor = React.createClass({
  render() {
    const {document} = this.props;

    return (
      <div id='doc-edit-editor'>
        编辑器
      </div>
    );
  }
});

export default DocumentEditEditor;
