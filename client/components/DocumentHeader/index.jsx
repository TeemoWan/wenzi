import React from 'react';

const DocumentHeader = React.createClass({
  render() {
    const {document, owner} = this.props;

    return (
      <div id='doc-header'>
        <h1 className='ui header'>
          {document.owner.ownerType === 'user' ?
          <a href={`/user/${owner._id}`}>{owner.username}</a> :
          <a href={`/team/${owner._id}`}>{owner.name}</a>}
          &nbsp;/&nbsp;
          <a href={`/document/${document._id}`}><b>{document.name}</b></a>
          <div className='sub header'>{document.summary}</div>
        </h1>
        <div className='ui labeled right floated small button'>
          <div className='ui basic blue small button'>
            <i className='fork icon'/>复制
          </div>
          <a className='ui basic left pointing blue label'>1,024</a>
        </div>
        <div className='ui labeled right floated small button'>
          <div className='ui small button'>
            <i className='heart icon'/>取消收藏
          </div>
          <a className='ui basic left pointing label'>2,048</a>
        </div>
        <a href=''>
          <button className='ui teal button'>阅读</button>
        </a>
        <a href={`/document/${document._id}/edit`}>
          <button className='ui teal button'>编辑</button>
        </a>
        <a href=''>
          <button className='ui teal button'>下载</button>
        </a>
        <div className='ui hidden divider'></div>
        <div className='ui pointing menu'>
          <a className='active item'>结构</a>
          <a className='item'>资源池</a>
          <a className='item'>缺陷&改进</a>
          <a className='item'>合入请求</a>
          <a className='item'>统计</a>
        </div>
      </div>
    );
  }
});

export default DocumentHeader;
