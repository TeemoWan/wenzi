import React from 'react';

const DocumentIndex = React.createClass({
  render() {
    const {FlowRouter, documents, loading} = this.props;

    return (
      <div className='ui main container' id='content'>
        {loading
          ? <div className='ui active large centered loader'></div>
          : <div className='ui relaxed divided list'>
            {documents.map(document =>
              <div className='item' key={document._id}>
                <i className='large github middle aligned icon'/>
                <div className='content'>
                  <div className='header'>
                    {document.owner.ownerType === 'user'
                      ? <a href='' onClick={(e) => FlowRouter.go(`/user/${document.owner.user._id}`)}>
                          {document.owner.user.username}
                        </a>
                      : <a href='' onClick={(e) => FlowRouter.go(`/team/${document.owner.team._id}`)}>
                          {document.owner.team.name}
                        </a>}
                    /<a href='' onClick={(e) => FlowRouter.go(`/document/${document._id}`)}>{document.name}</a>
                  </div>
                  <div className='description'>{document.summary}</div>
                </div>
              </div>)}
          </div>
          }
      </div>
    )
  }
});

export default DocumentIndex;
