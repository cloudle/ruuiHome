import { utils } from 'react-universal-ui';
import { StaticRouter } from 'react-router';
import * as Routers from 'react-router-dom';

export const Router = utils.isServer ? StaticRouter : Routers.BrowserRouter;
export const { withRouter } = Routers;