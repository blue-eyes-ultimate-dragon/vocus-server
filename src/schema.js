// @flow

import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { me, stories, story } from './queries';
import { createStory } from './mutations';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      me,
      stories,
      story,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createStory,
    },
  }),
});
