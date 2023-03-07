const { Client } = require('pg');

const PG_URL =
  'postgres://qqhypuyp:Dak03AiRkA0_wS6xpC8_S248Hzup0cv-@rajje.db.elephantsql.com/qqhypuyp';
const client = new Client(PG_URL);

async function connect(client) {
  try {
    await client.connect();
    console.log('Postgres client connected');

    // const { rows } = await client.query('SELECT * FROM USERS');
    // console.log(rows);
    await client.end();
  } catch (err) {
    console.log(`error + ${err}`);
  }
  // finally {
  //   await client.close();
  // }
}

connect(client);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    console.log('params', params);
    console.log('callback', callback);
    return client.query(text, params, callback);
  },
};
