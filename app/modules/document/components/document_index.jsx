import React from 'react';

const DocumentIndex = React.createClass({
  render() {
    const {FlowRouter, documents} = this.props;

    return (
      <div className='ui relaxed divided list' id='doc-index'>
        {documents.map(document =>
          <div className='item' key={document._id}>
            <i className='large github middle aligned icon'/>
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
