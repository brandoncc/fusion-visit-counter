// @flow
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';
import JWTSession, {
  SessionSecretToken,
  SessionCookieNameToken,
  SessionCookieExpiresToken
} from 'fusion-plugin-jwt';
import {SessionToken} from 'fusion-tokens';

import root from './root.js';
import browserCounter from './plugins/browser_counter';
import serverCounter from './plugins/server_counter';

export default () => {
  const app = new App(root);
  app.register(Styletron);
  app.register(Router);

  if (__NODE__) {
    app.register(SessionToken, JWTSession);
    app.register(SessionSecretToken, 'some-secret'); // required
    app.register(SessionCookieNameToken, 'some-cookie-name'); // required
    app.register(SessionCookieExpiresToken, 86400); // optional
  }

  __BROWSER__ && app.register(browserCounter);
  __NODE__ && app.register(serverCounter);

  return app;
};
