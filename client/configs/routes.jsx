import React from 'react';
import {injectDeps} from 'react-simple-di';
import {mount} from 'react-mounter';
import {meteFlowRouter} from 'meteor/kadira:flow-router';
import MainLayout from '../layouts/MainLayout.jsx';
import Home from '../containers/Home.jsx';
import NotFound from '../layouts/NotFound.jsx';

export const initRoutes = (context, actions) => {
  const MainLayoutCtx = injectDeps(context, actions)(MainLayout);

  FlowRouter.route('/', {
    name: 'appHome',
    action: function () {
      mount(MainLayoutCtx, {content: () => (<Home />)});
    }
  });

  FlowRouter.notFound = {
    action: function () {
      mount(MainLayoutCtx, {content: () => (<NotFound />)});
    }
  };
};
