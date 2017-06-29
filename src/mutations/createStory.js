import { GraphQLString, GraphQLNonNull } from 'graphql';
import StoryType from '../types/StoryType';
import knex from '../db';

export default {
  type: StoryType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    featuredImage: { type: GraphQLString },
  },
  async resolve(root, args, ctx) {
    const user = await root.authenticate(ctx);
    const story = await knex
      .table('stories')
      .insert({
        title: args.title,
        content: args.content,
        user_uuid: user.id,
      })
      .returning('*');
    return story[0];
  },
};
