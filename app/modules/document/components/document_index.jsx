import React from 'react';

const DocumentIndex = React.createClass({
  render() {
    const {FlowRouter, documents} = this.props;

    return (
      <div className='ui segments' id='doc-index'>
        {documents.map(document =>
          <div className='ui segment' key={document._id}>
            <div className='content'>
              <div className='header'>
                {document.owner.ownerType === 'user' ?
                  <a href={FlowRouter.path('user.home', {id: document.owner.user._id})}>{document.owner.user.username}</a> :
                  <a href={FlowRouter.path('team.home', {id: document.owner.team._id})}>{document.owner.team.name}</a>}
                &nbsp;/&nbsp;
                <a href={FlowRouter.path('document.home', {id: document._id})}>{document.name}</a>
              </div>
              <div className='description'>{document.summary}</div>
            </div>
          </div>)}
      </div>
    );
  }
});

export default DocumentIndex;
