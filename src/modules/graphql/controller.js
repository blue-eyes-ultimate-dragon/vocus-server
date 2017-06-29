// @flow

import graphqlHTTP from 'koa-graphql';
import { printSchema } from 'graphql';
import { verify } from 'jsonwebtoken';
import schema from '../../schema';
import knex from '../../db';

const root = {
  async authenticate(ctx) {
    let token = '';
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
    const user = await knex
      .table('users')
      .where({ email: token.email })
      .first();
    return user;
  },
};

export const http = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: process.env.NODE_ENV !== 'production',
  pretty: process.env.NODE_ENV !== 'production',
});

export async function print(ctx) {
  ctx.type = 'text/plain';
  ctx.body = printSchema(schema);
}
