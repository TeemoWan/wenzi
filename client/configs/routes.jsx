import React from 'react';
import {injectDeps} from 'react-simple-di';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import MainLayout from '../components/MainLayout/index.jsx';
import AuthLayout from '../components/AuthLayout/index.jsx';
import FluidLayout from '../components/FluidLayout/index.jsx';
import Home from '../components/Home/index.jsx';
import NotFound from '../components/NotFound/index.jsx';
import Login from '../containers/login';
import Register from '../containers/register';
import ForgotPassword from '../containers/forgotPassword';
import User from '../containers/user';
import TeamAdd from '../containers/teamAdd';
import Team from '../containers/team';
import DocumentIndex from '../containers/documentIndex';
import DocumentAdd from '../containers/documentAdd';
import Document from '../containers/document';
import DocumentEdit from '../containers/documentEdit';

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

export const initRoutes = (context, actions) => {
  const MainLayoutCtx = injectDeps(context, actions)(MainLayout);
  const AuthLayoutCtx = injectDeps(context, actions)(AuthLayout);
  const FluidLayoutCtx = injectDeps(context, actions)(FluidLayout);

  FlowRouter.route('/', {
    name: 'appHome',
    action: () => {
      mount(MainLayoutCtx, {content: () => (<Home />)});
    }
  });

  FlowRouter.route('/login', {
    name: 'login',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mount(AuthLayoutCtx, {content: () => (<Login />)});
    }
  });

  FlowRouter.route('/register', {
    name: 'register',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mount(AuthLayoutCtx, {content: () => (<Register />)});
    }
  });

  FlowRouter.route('/forgotPassword', {
    name: 'forgotPassword',
    triggersEnter: [ redirectIfLoggedIn ],
    action: () => {
      mount(AuthLayoutCtx, {content: () => (<ForgotPassword />)});
    }
  });

  FlowRouter.route('/user/:id', {
    name: 'user',
    action: ({id}) => {
      mount(MainLayoutCtx, {content: () => (<User userId={id}/>)});
    }
  });

  FlowRouter.route('/team/add', {
    name: 'teamAdd',
    triggersEnter: [ checkLoggedIn ],
    action: () => {
      mount(MainLayoutCtx, {content: () => (<TeamAdd />)});
    }
  });

  FlowRouter.route('/team/:id', {
    name: 'team',
    action: ({id}) => {
      mount(MainLayoutCtx, {content: () => (<Team teamId={id}/>)});
    }
  });

  FlowRouter.route('/document', {
    name: 'documentIndex',
    action: () => {
      mount(MainLayoutCtx, {content: () => (<DocumentIndex />)});
    }
  });

  FlowRouter.route('/document/add', {
    name: 'documentAdd',
    triggersEnter: [ checkLoggedIn ],
    action: () => {
      mount(MainLayoutCtx, {content: () => (<DocumentAdd />)});
    }
  });

  FlowRouter.route('/document/:id', {
    name: 'document',
    action: ({id}) => {
      mount(MainLayoutCtx, {content: () => (<Document documentId={id}/>)});
    }
  });

  FlowRouter.route('/document/:id/edit', {
    name: 'documentEdit',
    triggersEnter: [ checkLoggedIn ],
    action: ({id}) => {
      mount(FluidLayoutCtx, {content: () => (<DocumentEdit documentId={id}/>)});
    }
  });

  FlowRouter.notFound = {
    action: () => {
      mount(MainLayoutCtx, {content: () => (<NotFound />)});
    }
  };
};
