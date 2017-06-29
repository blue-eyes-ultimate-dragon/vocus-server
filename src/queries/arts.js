import { GraphQLList } from 'graphql';
import ArtType from '../types/ArtType';
import knex from '../db';

export default {
  type: new GraphQLList(ArtType),
  async resolve() {
    const art = await knex.table('art');
    return art;
  },
};
