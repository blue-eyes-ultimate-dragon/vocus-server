// @flow

import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { me } from './queries';
import { createStory } from './mutations';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      me,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createStory,
    },
  }),
});
