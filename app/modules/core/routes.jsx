import React from 'react';
import {mount, withOptions} from 'react-mounter';

import LayoutMain from './components/layout_main.jsx';
import LayoutFullScreen from './components/layout_full_screen.jsx';
import LayoutFluid from './components/layout_fluid.jsx';
import Home from './containers/home.js';
import NotFound from './containers/not_found.js';
import Login from '/app/modules/auth/containers/login';
import Register from '/app/modules/auth/containers/register';
import ForgotPassword from '/app/modules/auth/containers/forgot_password';
import User from '/app/modules/user/containers/user';
import Team from '/app/modules/team/containers/team';
import TeamAdd from '/app/modules/team/containers/team_add';
import Document from '/app/modules/document/containers/document';
import DocumentIndex from '/app/modules/document/containers/document_index';
import DocumentAdd from '/app/modules/document/containers/document_add';
import DocumentEdit from '/app/modules/document/containers/document_edit';
import Search from '/app/modules/search/containers/search';

const mountWithOptions = withOptions({
  rootId: 'wenzi'
}, mount);

export default function (injectDeps, {FlowRouter, Meteor}) {
  const LayoutMainCtx = injectDeps(LayoutMain);
  const LayoutFullScreenCtx = injectDeps(LayoutFullScreen);
  const LayoutFluidCtx = injectDeps(LayoutFluid);

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
    name: 'app',
    action: () => {
      mountWithOptions(LayoutMainCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'auth.login',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mountWithOptions(LayoutFullScreenCtx, {
        content: () => (<Login />)
      });
    }
  });

  FlowRouter.route('/register', {
    name: 'auth.register',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mountWithOptions(LayoutFullScreenCtx, {
        content: () => (<Register />)
      });
    }
  });

  FlowRouter.route('/forgotPassword', {
    name: 'auth.forgotPassword',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mountWithOptions(LayoutFullScreenCtx, {
        content: () => (<ForgotPassword />)
      });
    }
  });

  FlowRouter.route('/user/:id', {
    name: 'user.user',
    action: ({id}) => {
      mountWithOptions(LayoutMainCtx, {
        content: () => (<User userId={id}/>)
      });
    }
  });

  FlowRouter.route('/team/add', {
    name: 'team.add',
    triggersEnter: [ checkLoggedIn ],
    action: () => {
      mountWithOptions(LayoutMainCtx, {
        content: () => (<TeamAdd />)
      });
    }
  });

  FlowRouter.route('/team/:id', {
    name: 'team.team',
    action: ({id}) => {
      mountWithOptions(LayoutMainCtx, {
        content: () => (<Team teamId={id}/>)
      });
    }
  });

  FlowRouter.route('/document', {
    name: 'document.index',
    action: () => {
      mountWithOptions(LayoutMainCtx, {
        content: () => (<DocumentIndex />)
      });
    }
  });

  FlowRouter.route('/document/add', {
    name: 'document.add',
    triggersEnter: [ checkLoggedIn ],
    action: () => {
      mountWithOptions(LayoutMainCtx, {
        content: () => (<DocumentAdd />)
      });
    }
  });

  FlowRouter.route('/document/:id', {
    name: 'document.document',
    action: ({id}) => {
      mountWithOptions(LayoutMainCtx, {
        content: () => (<Document documentId={id}/>)
      });
    }
  });

  FlowRouter.route('/document/:id/edit', {
    name: 'document.edit',
    triggersEnter: [ checkLoggedIn ],
    action: ({id}) => {
      mountWithOptions(LayoutFluidCtx, {
        content: () => (<DocumentEdit documentId={id}/>)
      });
    }
  });

  FlowRouter.route('/search', {
    name: 'search',
    action: () => {
      mountWithOptions(LayoutMainCtx, {
        content: () => (<Search />)
      });
    }
  });

  FlowRouter.notFound = {
    action: () => {
      mountWithOptions(LayoutMainCtx, {
        content: () => (<NotFound />)
      });
    }
  };
};
