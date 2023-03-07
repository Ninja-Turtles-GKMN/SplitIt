const { Pool } = require('pg');

const PG_URL =
  'postgres://qqhypuyp:Dak03AiRkA0_wS6xpC8_S248Hzup0cv-@rajje.db.elephantsql.com/qqhypuyp';

const pool = new Pool({ connectionString: PG_URL });

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    console.log('params', params);
    console.log('callback', callback);
    return pool.query(text, params, callback);
  },
};
