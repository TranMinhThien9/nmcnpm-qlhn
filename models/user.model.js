const bcrypt = require('bcryptjs');
const momentTz = require('moment-timezone');

const db = require('../utils/db');

module.exports = {
    all: db.load('SELECT * FROM user'),

    add: entity => {
        const hash = bcrypt.hashSync(entity.password, 8);
        entity.password = hash;
        return db.add(entity, 'user');
    },

    getUsername: async user_name => {
        const sql = `select id from user where '${user_name}' = user_name`;
        const row = await db.load(sql);
        return row[0];
    },

    getEmail: async email => {
        const sql = `select id from user where '${email}' = email`;
        const row = await db.load(sql);
        return row[0];
    }
}