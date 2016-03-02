import React from 'react';
import {$} from 'meteor/jquery';
import classNames from 'classnames';

const DocumentAdd = React.createClass({
  componentDidMount() {
    const {loading, user} = this.props;

    if (loading) {
      $('.ui.dropdown').dropdown();
    } else {
      $('.ui.dropdown').dropdown('set selected', `user:${user._id}`);
    }
  },

  componentDidUpdate() {
    const {loading, user} = this.props;

    if (loading) {
      $('.ui.dropdown').dropdown();
    } else {
      $('.ui.dropdown').dropdown('set selected', `user:${user._id}`);
    }
  },

  render() {
    const {processing, error, user, teams} = this.props;
    let items = [];

    items.push(
      <div className='item' data-value={`user:${user._id}`} key={user._id}>
        <i className='user icon'/>
        {user.username}
      </div>
    );

    teams.forEach((team) => {
      items.push(
        <div className='item' data-value={`team:${team._id}`} key={team._id}>
          <i className='users icon'/>
          {team.name}
        </div>
      );
    });

    return (
      <div className='ui grid' id='doc-add'>
        <div className='two wide column'></div>
        <div className='twelve wide column'>
          <form className={classNames('ui', 'form', {error: Boolean(error)})}>
            <h2 className='ui dividing header'>添加文档</h2>
            {error && <div className='ui error message'><p>{error}</p></div>}
            <div className='fields'>
              <div className='five wide field'>
                <label>所有者</label>
                <div className='ui fluid selection dropdown'>
                  <input type='hidden' name='owner' ref='owner' />
                  <i className='dropdown icon'/>
                  <div className='default text'>所有者</div>
                  <div className='menu'>
                    {items}
                  </div>
                </div>
              </div>
              <div className='eleven wide field'>
                <label>文档名</label>
                <input type='text' ref='name' placeholder='文档名' />
              </div>
            </div>
            <div className='field'>
              <label>文档简介</label>
              <textarea ref='summary' placeholder='文档简介...' />
            </div>
            {processing ?
              <div className='ui teal loading disabled button'>&nbsp;</div> :
              <div className='ui teal button' onClick={this.handleSubmit}>添加文档</div>}
          </form>
        </div>
        <div className='two wide column'></div>
      </div>
    );
  },

  handleSubmit() {
    const {documentAdd} = this.props;
    const {owner, name, summary} = this.refs;
    const [ ownerType, ownerId ] = owner.value.split(':');

    documentAdd(ownerType, ownerId, name.value.trim(), summary.value);
  }
});

export default DocumentAdd;
