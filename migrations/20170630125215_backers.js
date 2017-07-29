const Knex = require('knex');
const config = require('../knexfile.js');

const knex = new Knex(config);
exports.up = async (db) => {
  await db.schema.createTable('backers', (table) => {
    table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v1()')).primary();
    table.uuid('user_uuid');
    table.json('backers');
  });
};

exports.down = async (db) => {
  await db.schema.dropTableIfExists('backers');
};

module.exports.configuration = { transaction: true };
