// @flow

import autenticate from './controller';

export const baseUrl = '/authenticate';

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [autenticate],
  },
];
