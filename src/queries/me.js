import UserType from '../types/UserType';

export default {
  type: UserType,
  async resolve(root, args, ctx) {
    return root.authenticate(ctx);
  },
};
