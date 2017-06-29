const Knex = require('knex');
const config = require('../knexfile.js');

const knex = new Knex(config);

exports.up = async (db) => {
  await db.schema.createTable('art', (table) => {
    table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v1()')).primary();
    table.text('title').notNullable();
    table.text('description');
    table.uuid('user_uuid').notNullable();
    table.json('images');
    table.timestamps();
  });
};

exports.down = async (db) => {
  await db.schema.dropTableIfExists('stories');
};

module.exports.configuration = { transaction: true };
