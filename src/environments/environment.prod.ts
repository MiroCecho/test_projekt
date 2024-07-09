import { BrowserAuthorizationClientConfiguration } from '@itwin/browser-authorization';

export const environment: {
  production: boolean;
  authorization: BrowserAuthorizationClientConfiguration;
} = {
  production: true,
  authorization: {
    clientId: '',
    scope:
      'itwin-platform',
    redirectUri: '',
    postSignoutRedirectUri: '',
    responseType: 'code',
    authority: 'https://ims.bentley.com',
  },
};

export type IEnvironment = typeof environment;