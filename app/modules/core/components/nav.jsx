import React from 'react';
import {$} from 'meteor/jquery';

const Nav = React.createClass({
  componentDidMount() {
    $('.ui.dropdown').dropdown();
  },

  componentDidUpdate() {
    $('.ui.dropdown').dropdown();
  },

  render() {
    const {FlowRouter, user, logout} = this.props;
    const searchPath = FlowRouter.path('search');
    const homePath = FlowRouter.path('home');
    const documentIndexPath = FlowRouter.path('document.index');
    const documentAddPath = FlowRouter.path('document.add');
    const teamAddPath = FlowRouter.path('team.add');
    const loginPath = FlowRouter.path('auth.login');
    const userHomePath = user ? FlowRouter.path('user.home', {id: user._id}) : '';
    const settingsDomainPath = FlowRouter.path('settings.domain');

    return (
      <div className='ui borderless menu' id='nav'>
        <div className='item'>
          <div className='ui circular icon top left pointing dropdown blue basic button' id='nav-menu'>
            <i className='sidebar icon'/>
            <div className='menu'>
              <a className='item' href={documentIndexPath}>文档</a>
              <a className='item' href=''>文章</a>
              <a className='item' href=''>自由分类</a>
            </div>
          </div>

          <a href={searchPath}>
            <button className='ui circular icon blue basic button'>
              <i className='search icon'/>
            </button>
          </a>
        </div>

        <div className='item'>
          <div className='logo'>
            <a href={homePath}>
              <img className='ui image' src='/images/logo.png'/>
            </a>
          </div>
        </div>

        {user?
        <div className='item'>
          <div className='ui circular icon top right pointing dropdown blue basic button' id='nav-add'>
            <i className='plus icon'/>
            <div className='menu'>
              <a className='item' href={documentAddPath}>
                <i className='book icon'/> 文档项目
              </a>
              <a className='item' href=''>
                <i className='file text outline icon'/> 文章
              </a>
              <a className='item' href=''>
                <i className='sitemap icon'/> 分类
              </a>
              <a className='item' href=''>
                <i className='share alternate icon'/> 结点
              </a>
              <div className='divider'></div>
              <a className='item' href={teamAddPath}>
                <i className='users icon'/> 团队
              </a>
            </div>
          </div>

          <button className='ui circular icon blue basic button' id='nav-alarm'>
            <i className='alarm outline icon'/>
          </button>

          <button className='ui circular icon blue basic button' id='nav-help'>
            <i className='help icon'/>
          </button>
          
          <div className='ui circular top right pointing dropdown' id='nav-user'>
            <img className='ui avatar image' src='/images/jenny.jpg'/>
            <div className='menu'>
              <a className='item' href={userHomePath}>
                <i className='home icon'/> 主页
              </a>
              <a className='item' href={settingsDomainPath}>
                <i className='setting icon'/> 设置
              </a>
              <div className='divider'></div>
              <a className='item' onClick={() => logout()}>
                <i className='sign out icon'/> 登出
              </a>
            </div>
          </div>
        </div>:
        <div className='item'>
          <a href={loginPath}>
            <button className='ui circular icon blue basic button'>
              <i className='sign in icon'/> 注册或登录
            </button>
          </a>
        </div>}
      </div>
    );
  }
});

export default Nav;
