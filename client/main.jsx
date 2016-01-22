import loadMethodStubs from './configs/method_stubs';
import {initRoutes} from './configs/routes.jsx';
import {initContext} from './configs/context.js';
import actions from './actions';

loadMethodStubs();
const context = initContext();
initRoutes(context, actions);
