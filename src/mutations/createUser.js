import { GraphQLString, GraphQLNonNull } from 'graphql';

import UserType from '../types/UserType';

export default {
  type: UserType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    featuredImage: { type: GraphQLString },
  },
  async resolve() {
    console.log('hello');
  },
};
