import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import authModule from './modules/auth';
import documentModule from './modules/document';
import teamModule from './modules/team';
import userModule from './modules/user';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(authModule);
app.loadModule(documentModule);
app.loadModule(teamModule);
app.loadModule(userModule);
app.init();
