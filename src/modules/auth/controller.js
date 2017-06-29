// @flow

import passport from 'koa-passport';

export default async function authenticate(ctx, next) {
  return passport.authenticate('local', (err, user) => {
    if (err) {
      return ctx.throw(500, err);
    }
    // If there were no errors and no user was retrieved, it's an
    // authentication issue. i.e., HTTP 401 Unauthorized.
    if (!user) {
      return ctx.throw(401, err);
    }
    ctx.body = user.token();
  })(ctx, next);
}
