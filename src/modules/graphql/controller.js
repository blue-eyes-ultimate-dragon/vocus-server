// @flow

import graphqlHTTP from 'koa-graphql';
import { printSchema } from 'graphql';
import { verify } from 'jsonwebtoken';
import schema from '../../schema';
import knex from '../../db';

const root = {
  async authenticate(ctx) {
    let token = null;
    if (ctx.header.authorization) {
      token = verify(
        ctx.header.authorization.replace('Bearer ', ''),
        process.env.APP_SECRET,
      );
    }
    if (!token) {
      return ctx.throw(
        401,
        '401 - Unauthorized. You need to sign up to Vocus to use this endpoint',
      );
    }
    const user = await knex
      .table('users')
      .where({ email: token.email })
      .first();
    return user;
  },
  async checkBackerAuthorization(table, ctx) {
    const newTable = Object.assign({ authorized: false }, table);
    const backers = await knex
      .table('backers')
      .where({ user_uuid: newTable.user_uuid })
      .first();
    if (newTable.authorized_roles.includes('PUBLIC')) {
      newTable.authorized = true;
      return newTable;
    }
    newTable.authorized = false;
    const sanitizedOutput = Object.assign({}, newTable, { content: {} });
    let me;
    try {
      me = await root.authenticate(ctx);
    } catch (e) {
      me = { id: '' };
    }

    const isBacker =
      backers &&
      backers.backers.filter(
        val =>
          val.id.toLowerCase() === me.id.toLowerCase() &&
          newTable.authorized_roles.includes(val.type),
      )[0];
    const ownContent = me.id === newTable.user_uuid;
    if (ownContent || isBacker) {
      newTable.authorized = true;
      return newTable;
    }
    return sanitizedOutput;
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
