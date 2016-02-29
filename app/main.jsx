import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import userModule from './modules/user';
import authModule from './modules/auth';
import teamModule from './modules/team';
import documentModule from './modules/document';
import searchModule from './modules/search';
import settingsModule from './modules/settings';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(userModule);
app.loadModule(authModule);
app.loadModule(teamModule);
app.loadModule(documentModule);
app.loadModule(searchModule);
app.loadModule(settingsModule);
app.init();
