import React from 'react';
import Search from '../Search/index.jsx';
import '/client/lib/semantic-ui/definitions/modules/transition.js';
import '/client/lib/semantic-ui/definitions/modules/dropdown.js';

const Header = React.createClass({
  componentDidMount() {
    $('.ui.dropdown').dropdown();
  },

  componentDidUpdate() {
    $('.ui.dropdown').dropdown();
  },

  render() {
    let {FlowRouter, user} = this.props;
    let userItem;

    if (user) {
      userItem = <div className='ui right dropdown item'>
        <img className='ui right spaced avatar image' src='/images/jenny.jpg'/>
        {user.username}
        <i className='dropdown icon'/>
        <div className='menu'>
          <div className='item' onClick={(e) => FlowRouter.go(`/user/${user._id}`)}>
            <i className='home icon'/>
            主页
          </div>
          <div className='item'>
            <i className='setting icon'/>
            设置
          </div>
          <div className='divider'></div>
          <div className='item' onClick={e => Meteor.logout()}>
            <i className='sign out icon'/>
            登出
          </div>
        </div>
      </div>;
    } else {
      userItem = <a className='item' onClick={(e) => FlowRouter.go('/login')}>
        <i className='sign in icon'/>
        注册或登录
      </a>;
    }

    return (
      <div className='ui fixed borderless menu' id='header'>
        <div className='ui container'>
          <a className='item' onClick={(e) => FlowRouter.go('/')}>
            <img src='/images/logo.png'/>
          </a>
          <div className='ui dropdown icon item'>
            <i className='sidebar icon'/>
            <div className='menu'>
              <div className='item' onClick={(e) => FlowRouter.go('/document')}>
                文档
              </div>
              <div className='item'>
                文章
              </div>
              <div className='item'>
                自由分类
              </div>
            </div>
          </div>
          <Search />
          <div className='right menu'>
            <div className='ui right dropdown icon item'>
              <i className='plus icon'/>
              <div className='menu'>
                <div className='item' onClick={(e) => FlowRouter.go('/document/add')}>
                  <i className='book icon'/>
                  文档项目
                </div>
                <div className='item'>
                  <i className='file text outline icon'/>
                  文章
                </div>
                <div className='item'>
                  <i className='sitemap icon'/>
                  分类
                </div>
                <div className='item'>
                  <i className='share alternate icon'/>
                  结点
                </div>
                <div className='divider'></div>
                <div className='item' onClick={(e) => FlowRouter.go('/team/add')}>
                  <i className='users icon'/>
                  团队
                </div>
              </div>
            </div>
            {userItem}
          </div>
        </div>
      </div>
    )
  }
});

export default Header;
