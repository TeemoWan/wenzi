import React from 'react';
import {$} from 'meteor/jquery';

const DocumentEditHeader = React.createClass({
  componentDidMount() {
    $('.ui.dropdown').dropdown();
  },

  componentDidUpdate() {
    $('.ui.dropdown').dropdown();
  },

  render() {
    const {FlowRouter, document, user, logout} = this.props;
    const documentHomePath = FlowRouter.path('document.home', {id: document._id});
    const userHomePath = FlowRouter.path('user.home', {id: user._id});

    return (
      <div className='ui borderless menu' id='doc-edit-header'>
        <div className='item'>
          <a href={documentHomePath} id='doc-edit-return'>
            <button className='ui circular icon blue basic button'>
              <i className='angle left icon'/>
            </button>
          </a>

          <div className='ui icon top left pointing dropdown circular blue basic button' id='doc-edit-add'>
            <i className='plus icon'/> 添加章节
            <div className='menu'>
              <a className='item' href={userHomePath}>
                <i className='file icon'/> 章
              </a>
              <a className='item'>
                <i className='file outline icon'/> 节
              </a>
            </div>
          </div>

          <button className='ui circular icon blue basic button' id='doc-edit-preview'>
            <i className='unhide icon'/> 预览
          </button>

          <button className='ui circular icon blue basic button' id='doc-edit-commit'>
            <i className='checkmark icon'/> 提交
          </button>
        </div>

        <div className='item'>
          <button className='ui circular icon blue basic button' id='doc-edit-alarm'>
            <i className='alarm outline icon'/>
          </button>

          <button className='ui circular icon blue basic button' id='doc-edit-help'>
            <i className='help icon'/>
          </button>

          <div className='ui circular top right pointing dropdown' id='doc-edit-user'>
            <img className='ui avatar image' src='/images/jenny.jpg'/>
            <div className='menu'>
              <a className='item' href={userHomePath}>
                <i className='home icon'/> 主页
              </a>
              <a className='item'>
                <i className='setting icon'/> 设置
              </a>
              <div className='divider'></div>
              <a className='item' onClick={() => logout()}>
                <i className='sign out icon'/> 登出
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default DocumentEditHeader;
