import React from 'react';
import {injectDeps} from 'react-simple-di';
import {mount} from 'react-mounter';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import MainLayout from '../components/MainLayout/index.jsx';
import AuthLayout from '../components/AuthLayout/index.jsx';
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

  FlowRouter.route('/', {
    name: 'appHome',
    action: function () {
      mount(MainLayoutCtx, {content: () => (<Home />)});
    }
  });

  FlowRouter.route('/login', {
    name: 'login',
    triggersEnter: [redirectIfLoggedIn],
    action: function () {
      mount(AuthLayoutCtx, {content: () => (<Login />)});
    }
  });

  FlowRouter.route('/register', {
    name: 'register',
    triggersEnter: [redirectIfLoggedIn],
    action: function () {
      mount(AuthLayoutCtx, {content: () => (<Register />)});
    }
  });

  FlowRouter.route('/forgotPassword', {
    name: 'forgotPassword',
    triggersEnter: [redirectIfLoggedIn],
    action: function () {
      mount(AuthLayoutCtx, {content: () => (<ForgotPassword />)});
    }
  });

  FlowRouter.route('/user/:userId', {
    name: 'user',
    action: function ({userId}) {
      mount(MainLayoutCtx, {content: () => (<User userId={userId}/>)});
    }
  });

  FlowRouter.route('/team/add', {
    name: 'teamAdd',
    triggersEnter: [checkLoggedIn],
    action: function () {
      mount(MainLayoutCtx, {content: () => (<TeamAdd />)});
    }
  });

  FlowRouter.route('/team/:teamId', {
    name: 'team',
    action: function ({teamId}) {
      mount(MainLayoutCtx, {content: () => (<Team teamId={teamId}/>)});
    }
  });

  FlowRouter.route('/document', {
    name: 'documentIndex',
    action: function () {
      mount(MainLayoutCtx, {content: () => (<DocumentIndex />)});
    }
  });

  FlowRouter.route('/document/add', {
    name: 'documentAdd',
    triggersEnter: [checkLoggedIn],
    action: function () {
      mount(MainLayoutCtx, {content: () => (<DocumentAdd />)});
    }
  });

  FlowRouter.route('/document/:documentId', {
    name: 'document',
    action: function ({documentId}) {
      mount(MainLayoutCtx, {content: () => (<Document documentId={documentId}/>)});
    }
  });

  FlowRouter.notFound = {
    action: function () {
      mount(MainLayoutCtx, {content: () => (<NotFound />)});
    }
  };
};
