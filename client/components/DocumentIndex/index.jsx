import React from 'react';

const DocumentIndex = React.createClass({
  render() {
    const {documents} = this.props;

    return (
      <div className='ui relaxed divided list' id='doc-index'>
        {documents.map(document =>
          <div className='item' key={document._id}>
            <i className='large github middle aligned icon'/>
            <div className='content'>
              <div className='header'>
                {document.owner.ownerType === 'user' ?
                  <a href={`/user/${document.owner.user._id}`}>
                    {document.owner.user.username}
                  </a> :
                  <a href={`/team/${document.owner.team._id}`}>
                    {document.owner.team.name}
                  </a>}
                /<a href={`/document/${document._id}`}>{document.name}</a>
              </div>
              <div className='description'>{document.summary}</div>
            </div>
          </div>)}
      </div>
    );
  }
});

export default DocumentIndex;
