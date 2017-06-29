// @flow

import User from '../models/User';

export default async function validateUser(ctx, next) {
  if (!ctx.state.user) {
    ctx.type = 'json';
    return ctx.throw(
      401,
      JSON.stringify({
        error: 'failed validation',
      })
    );
  }
  // Convert koa-jwt's ctx.state.user Object to the User model.
  ctx.state.user = new User(ctx.state.user);
  if (next) {
    return next();
  }
  return null;
}
