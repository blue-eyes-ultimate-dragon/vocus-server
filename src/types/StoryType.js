// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import UserType from './UserType';
import knex from '../db';

export default new GraphQLObjectType({
  name: 'Story',
  fields: {
    id: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve: post =>
        knex.table('users').where({ id: post.user_uuid }).first(),
    },
    content: {
      type: GraphQLString,
    },
    featuredImage: {
      type: GraphQLString,
      resolve: post => post.featured_image,
    },
    subtitle: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    drafts: {
      type: GraphQLJSON,
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
