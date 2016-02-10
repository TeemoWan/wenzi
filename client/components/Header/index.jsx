import React from 'react';
import {$} from 'meteor/jquery';
import Search from '../Search/index.jsx';
import '../../lib/semantic-ui/definitions/modules/transition.js';
import '../../lib/semantic-ui/definitions/modules/dropdown.js';

const Header = React.createClass({
  componentDidMount() {
    $('.ui.dropdown').dropdown();
  },

  componentDidUpdate() {
    $('.ui.dropdown').dropdown();
  },

  render() {
    let {user, logout} = this.props;
    let userItem;

    if (user) {
      userItem = <div className='ui right dropdown item'>
        <img className='ui right spaced avatar image' src='/images/jenny.jpg'/>
        {user.username}
        <i className='dropdown icon'/>
        <div className='menu'>
          <a className='item' href={`/user/${user._id}`}>
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
      </div>;
    } else {
      userItem = <a className='item' href='/login'>
        <i className='sign in icon'/>
        注册或登录
      </a>;
    }

    return (
      <div className='ui fixed borderless menu' id='header'>
        <a className='item' href='/'>
          <img src='/images/logo.png'/>
        </a>
        <div className='ui dropdown icon item'>
          <i className='sidebar icon'/>
          <div className='menu'>
            <a className='item' href='/document'>
              文档
            </a>
            <a className='item' href=''>
              文章
            </a>
            <a className='item' href=''>
              自由分类
            </a>
          </div>
        </div>
        <Search />
        <div className='right menu'>
          <div className='ui right dropdown icon item'>
            <i className='plus icon'/>
            <div className='menu'>
              <a className='item' href='/document/add'>
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
              <a className='item' href='/team/add'>
                <i className='users icon'/>
                团队
              </a>
            </div>
          </div>
          {userItem}
        </div>
      </div>
    );
  }
});

export default Header;
