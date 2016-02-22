import React from 'react';
import {$} from 'meteor/jquery';

const Header = React.createClass({
  componentDidMount() {
    $('#header-menu-button')
      .popup({
        popup: '#header-menu-popup',
        position: 'bottom left',
        distanceAway: 8,
        on: 'click',
        hoverable: true
      });

    $('#header-add-button')
      .popup({
        popup: '#header-add-popup',
        position: 'bottom right',
        distanceAway: 9,
        on: 'click',
        hoverable: true
      });

    $('#header-user-button')
      .popup({
        popup: '#header-user-popup',
        position: 'bottom right',
        distanceAway: 15,
        on: 'click',
        hoverable: true
      });
  },

  componentDidUpdate() {
    $('#header-menu-button')
      .popup({
        popup: '#header-menu-popup',
        position: 'bottom left',
        distanceAway: 8,
        on: 'click',
        hoverable: true
      });

    $('#header-add-button')
      .popup({
        popup: '#header-add-popup',
        position: 'bottom right',
        distanceAway: 9,
        on: 'click',
        hoverable: true
      });

    $('#header-user-button')
      .popup({
        popup: '#header-user-popup',
        position: 'bottom right',
        distanceAway: 15,
        on: 'click',
        hoverable: true
      });
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

    return (
      <div className='ui fixed borderless secondary menu' id='header'>
        <div className='item'>
          <button className='ui circular icon button' id='header-menu-button'>
            <i className='sidebar icon'/>
          </button>

          <a href={searchPath}>
            <button className='ui circular icon button'>
              <i className='search icon'/>
            </button>
          </a>
          <div className='ui popup hidden' id='header-menu-popup'>
            <div className='ui secondary vertical menu'>
              <a className='item' href={documentIndexPath}>文档</a>
              <a className='item' href=''>文章</a>
              <a className='item' href=''>自由分类</a>
            </div>
          </div>
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
          <button className='ui circular icon button' id='header-add-button'>
            <i className='plus icon'/>
          </button>

          <button className='ui circular icon button' id='header-alarm-button'>
            <i className='alarm outline icon'/>
          </button>

          <a id='header-user-button' href=''>
            <img className='ui avatar image' src='/images/jenny.jpg'/>
          </a>

          <div className='ui popup hidden' id='header-add-popup'>
            <div className='ui secondary vertical menu'>
              <a className='item' href={documentAddPath}>
                <i className='book icon'/>
                文档项目
              </a>
              <a className='item' href=''>
                <i className='file text outline icon'/>
                文章
              </a>
              <a className='item' href=''>
                <i className='sitemap icon'/>
                分类
              </a>
              <a className='item' href=''>
                <i className='share alternate icon'/>
                结点
                </a>
              <div className='divider'></div>
              <a className='item' href={teamAddPath}>
                <i className='users icon'/>
                团队
              </a>
            </div>
          </div>

          <div className='ui popup hidden' id='header-user-popup'>
            <div className='ui secondary vertical menu'>
              <a className='item' href={userHomePath}>
                <i className='home icon'/>
                主页
              </a>
              <a className='item'>
                <i className='setting icon'/>
                设置
              </a>
              <div className='divider'></div>
              <a className='item' onClick={() => logout()}>
                <i className='sign out icon'/>
                登出
              </a>
            </div>
          </div>
        </div>:
        <div className='item'>
          <a href={loginPath}>
            <button className='ui circular icon button'>
              <i className='sign in icon'/>
              注册或登录
            </button>
          </a>
        </div>}
      </div>
    );
  }
});

export default Header;
