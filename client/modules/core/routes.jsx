import React from 'react';
import {mount} from 'react-mounter';

import LayoutMain from './components/layout_main.jsx';
import LayoutFullScreen from './components/layout_full_screen.jsx';
import LayoutFluid from './components/layout_fluid.jsx';
import Home from './components/home.jsx';
import NotFound from './components/not_found.jsx';
import Login from '/client/modules/auth/containers/login';
import Register from '/client/modules/auth/containers/register';
import ForgotPassword from '/client/modules/auth/containers/forgot_password';
import User from '/client/modules/user/containers/user';
import Team from '/client/modules/team/containers/team';
import TeamAdd from '/client/modules/team/containers/team_add';
import Document from '/client/modules/document/containers/document';
import DocumentIndex from '/client/modules/document/containers/document_index';
import DocumentAdd from '/client/modules/document/containers/document_add';
import DocumentEdit from '/client/modules/document/containers/document_edit';

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
      mount(LayoutMainCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'auth.login',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mount(LayoutFullScreenCtx, {
        content: () => (<Login />)
      });
    }
  });

  FlowRouter.route('/register', {
    name: 'auth.register',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mount(LayoutFullScreenCtx, {
        content: () => (<Register />)
      });
    }
  });

  FlowRouter.route('/forgotPassword', {
    name: 'auth.forgotPassword',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mount(LayoutFullScreenCtx, {
        content: () => (<ForgotPassword />)
      });
    }
  });

  FlowRouter.route('/user/:id', {
    name: 'user.user',
    action: ({id}) => {
      mount(LayoutMainCtx, {
        content: () => (<User userId={id}/>)
      });
    }
  });

  FlowRouter.route('/team/add', {
    name: 'team.add',
    triggersEnter: [ checkLoggedIn ],
    action: () => {
      mount(LayoutMainCtx, {
        content: () => (<TeamAdd />)
      });
    }
  });

  FlowRouter.route('/team/:id', {
    name: 'team.team',
    action: ({id}) => {
      mount(LayoutMainCtx, {
        content: () => (<Team teamId={id}/>)
      });
    }
  });

  FlowRouter.route('/document', {
    name: 'document.index',
    action: () => {
      mount(LayoutMainCtx, {
        content: () => (<DocumentIndex />)
      });
    }
  });

  FlowRouter.route('/document/add', {
    name: 'document.add',
    triggersEnter: [ checkLoggedIn ],
    action: () => {
      mount(LayoutMainCtx, {
        content: () => (<DocumentAdd />)
      });
    }
  });

  FlowRouter.route('/document/:id', {
    name: 'document.document',
    action: ({id}) => {
      mount(LayoutMainCtx, {
        content: () => (<Document documentId={id}/>)
      });
    }
  });

  FlowRouter.route('/document/:id/edit', {
    name: 'document.edit',
    triggersEnter: [ checkLoggedIn ],
    action: ({id}) => {
      mount(LayoutFluidCtx, {
        content: () => (<DocumentEdit documentId={id}/>)
      });
    }
  });

  FlowRouter.notFound = {
    action: () => {
      mount(LayoutMainCtx, {
        content: () => (<NotFound />)
      });
    }
  };
};
