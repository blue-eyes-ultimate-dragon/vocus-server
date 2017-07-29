import { verify } from 'jsonwebtoken';
import knex from '../db';

async function authenticate(ctx) {
  let token = null;
  if (ctx.header.authorization) {
    token = verify(
      ctx.header.authorization.replace('Bearer ', ''),
      process.env.APP_SECRET
    );
  }
  if (!token) {
    return ctx.throw(
      401,
      '401 - Unauthorized. You need to sign up to Rettai.com to use this endpoint'
    );
  }
  const user = await knex.table('users').where({ email: token.email }).first();
  return user;
}

export default authenticate;
