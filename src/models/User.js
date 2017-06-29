// @flow

import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import pick from 'ramda/src/pick';
import knex from '../db';

const fields = ['id', 'email', 'name'];

class User {
  id: string;
  email: string;
  name: string;

  constructor(props: Object) {
    // Whitelist fields.
    Object.assign(this, pick(fields, props));
  }

  async verify(password: string): Promise<boolean> {
    // Grab raw data from database to get access to other fields.
    const user = await knex.table('users').where({ email: this.email }).first();

    if (!user || !user.password_hash) {
      return false;
    }

    return compareSync(password, user.password_hash);
  }

  token(): string {
    return sign(this, process.env.APP_SECRET, {
      expiresIn: 60 * 60 * 2 /* hours */,
    });
  }

  static async find(...args) {
    return knex
      .table('users')
      .where(...(args.length ? args : [{}]))
      .select(...fields)
      .then(rows => rows.map(x => new User(x)));
  }

  static async findByIds(ids: string[]): Promise<Array<User | Error>> {
    return knex.table('users').whereIn('id', ids).then(rows =>
      ids.map(id => {
        const row = rows.find(x => x.id === id);
        return row && new User(row);
      })
    );
  }

  static async findOne(...args): Promise<User> {
    return knex
      .table('users')
      .where(...(args.length ? args : [{}]))
      .first()
      .then(x => x && new User(x));
  }

  static async any(...args): Promise<boolean> {
    return knex
      .raw(
        'SELECT EXISTS ?',
        knex
          .table('users')
          .where(...(args.length ? args : [{}]))
          .select(knex.raw('1'))
      )
      .then(x => x.rows[0].exists);
  }

  static create(user) {
    return knex.table('users').insert(user, fields).then(x => new User(x[0]));
  }
}

export default User;
