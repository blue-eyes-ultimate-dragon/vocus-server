// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import UserType from './UserType';
import knex from '../db';

export default new GraphQLObjectType({
  name: 'Art',
  fields: {
    id: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve: art => knex.table('users').where({ id: art.user_uuid }).first(),
    },
    description: {
      type: GraphQLString,
    },
    images: {
      type: GraphQLJSON,
    },
    title: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
      resolve: post => post.created_at,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: post => post.updated_at,
    },
  },
});
