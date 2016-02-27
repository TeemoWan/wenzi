import React from 'react';
import {mount, withOptions} from 'react-mounter';

import LayoutNavContent from './components/layout_nav_content.jsx';
import LayoutContent from './components/layout_content.jsx';
import Home from './containers/home.js';
import NotFound from './containers/not_found.js';
import Login from '/app/modules/auth/containers/login';
import Register from '/app/modules/auth/containers/register';
import ForgotPassword from '/app/modules/auth/containers/forgot_password';
import UserHome from '/app/modules/user/containers/user_home';
import TeamHome from '/app/modules/team/containers/team_home';
import TeamAdd from '/app/modules/team/containers/team_add';
import DocumentHome from '/app/modules/document/containers/document_home';
import DocumentIndex from '/app/modules/document/containers/document_index';
import DocumentAdd from '/app/modules/document/containers/document_add';
import DocumentEdit from '/app/modules/document/containers/document_edit';
import Search from '/app/modules/search/containers/search';

const mountWithOptions = withOptions({
  rootId: 'wenzi'
}, mount);

export default function (injectDeps, {FlowRouter, Meteor}) {
  const LayoutNavContentCtx = injectDeps(LayoutNavContent);
  const LayoutContentCtx = injectDeps(LayoutContent);

  const checkLoggedIn = () => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      FlowRouter.go('/login');
    }
  };

  const redirectIfLoggedIn = (ctx, redirect) => {
    if (Meteor.userId()) {
      redirect('/');
    }
  };

  FlowRouter.route('/', {
    name: 'home',
    action: () => {
      mountWithOptions(LayoutNavContentCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'auth.login',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mountWithOptions(LayoutContentCtx, {
        content: () => (<Login />)
      });
    }
  });

  FlowRouter.route('/register', {
    name: 'auth.register',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mountWithOptions(LayoutContentCtx, {
        content: () => (<Register />)
      });
    }
  });

  FlowRouter.route('/forgotPassword', {
    name: 'auth.forgotPassword',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mountWithOptions(LayoutContentCtx, {
        content: () => (<ForgotPassword />)
      });
    }
  });

  FlowRouter.route('/user/:id', {
    name: 'user.home',
    action: ({id}) => {
      mountWithOptions(LayoutNavContentCtx, {
        content: () => (<UserHome userId={id}/>)
      });
    }
  });

  FlowRouter.route('/team/add', {
    name: 'team.add',
    triggersEnter: [ checkLoggedIn ],
    action: () => {
      mountWithOptions(LayoutNavContentCtx, {
        content: () => (<TeamAdd />)
      });
    }
  });

  FlowRouter.route('/team/:id', {
    name: 'team.home',
    action: ({id}) => {
      mountWithOptions(LayoutNavContentCtx, {
        content: () => (<TeamHome teamId={id}/>)
      });
    }
  });

  FlowRouter.route('/document', {
    name: 'document.index',
    action: () => {
      mountWithOptions(LayoutNavContentCtx, {
        content: () => (<DocumentIndex />)
      });
    }
  });

  FlowRouter.route('/document/add', {
    name: 'document.add',
    triggersEnter: [ checkLoggedIn ],
    action: () => {
      mountWithOptions(LayoutNavContentCtx, {
        content: () => (<DocumentAdd />)
      });
    }
  });

  FlowRouter.route('/document/:id', {
    name: 'document.home',
    action: ({id}) => {
      mountWithOptions(LayoutNavContentCtx, {
        content: () => (<DocumentHome documentId={id}/>)
      });
    }
  });

  FlowRouter.route('/document/:id/edit', {
    name: 'document.edit',
    triggersEnter: [ checkLoggedIn ],
    action: ({id}) => {
      mountWithOptions(LayoutContentCtx, {
        content: () => (<DocumentEdit documentId={id}/>)
      });
    }
  });

  FlowRouter.route('/search', {
    name: 'search',
    action: () => {
      mountWithOptions(LayoutNavContentCtx, {
        content: () => (<Search />)
      });
    }
  });

  FlowRouter.notFound = {
    action: () => {
      mountWithOptions(LayoutNavContentCtx, {
        content: () => (<NotFound />)
      });
    }
  };
};
