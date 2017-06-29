import { GraphQLList } from 'graphql';
import StoryType from '../types/StoryType';
import knex from '../db';

export default {
  type: new GraphQLList(StoryType),
  async resolve() {
    const stories = await knex.table('stories');
    return stories;
  },
};
