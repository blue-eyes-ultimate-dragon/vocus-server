import knex from '../db';

async function checkBackerAuthorization(table, ctx) {
  const backers = await knex
    .table('backers')
    .where({ user_uuid: table.user_uuid })
    .first();
  const newTable = Object.assign({ authorized: false }, table);
  if (table.authorized_roles.includes('PUBLIC')) {
    newTable.authorized = true;
    return newTable;
  }
  const sanitizedOutput = Object.assign({}, newTable, { content: {} });
  let me;
  try {
    me = await root.authenticate(ctx);
  } catch (e) {
    me = { id: '' };
  }
  const isBacker =
    backers &&
    backers.backers.filter(
      val =>
        val.id.toLowerCase() === me.id.toLowerCase() &&
        newTable.authorized_roles.includes(val.type)
    )[0];
  const ownWork = me.id === table.user_uuid;

  if (isBacker || ownWork) {
    newTable.authorized = true;
    return newTable;
  }
  return sanitizedOutput;
}

export default checkBackerAuthorization;
