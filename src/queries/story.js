import { GraphQLNonNull, GraphQLString } from 'graphql';
import StoryType from '../types/StoryType';
import knex from '../db';

export default {
  type: StoryType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(root, args, ctx) {
    const stories = await knex.table('stories').where({ id: args.id }).first();
    return stories;
  },
};
