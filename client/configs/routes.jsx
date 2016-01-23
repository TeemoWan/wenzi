import React from 'react';
import {injectDeps} from 'react-simple-di';
import {mount} from 'react-mounter';
import {FlowRouter} from 'meteor/kadira:flow-router';
import MainLayout from '../components/MainLayout/index.jsx';
import AuthLayout from '../components/AuthLayout/index.jsx';
import Home from '../components/Home/index.jsx';
import NotFound from '../components/NotFound/index.jsx';
import Login from '../containers/login';
import Register from '../containers/register';
import ForgotPassword from '../containers/forgotPassword';

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
    action: function () {
      mount(AuthLayoutCtx, {content: () => (<Login />)});
    }
  });

  FlowRouter.route('/register', {
    name: 'register',
    action: function () {
      mount(AuthLayoutCtx, {content: () => (<Register />)});
    }
  });

  FlowRouter.route('/forgotPassword', {
    name: 'forgotPassword',
    action: function () {
      mount(AuthLayoutCtx, {content: () => (<ForgotPassword />)});
    }
  });

  FlowRouter.notFound = {
    action: function () {
      mount(MainLayoutCtx, {content: () => (<NotFound />)});
    }
  };
};
