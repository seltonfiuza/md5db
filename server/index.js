const keys = require('./keys');
const md5 = require('md5');
// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS key (key TEXT PRIMARY KEY, encrypted TEXT)')
  .catch(err => console.log(err));

app.get('/api/', async(req, res) => {
  const rows = await pgClient.query('SELECT count(*) as numKeys from keys');
  res.send({numKeys: rows.rows[0].numkeys})
})

app.post('/api/keys', async (req, res) => {
  const key = req.body.key
  const rows = await pgClient.query('SELECT * from keys WHERE key = $1', [key]);
  if(rows.rows.length == 0){
    const keyEncrypted = md5(key);
    pgClient.query('INSERT INTO keys VALUES($1, $2)', [key, keyEncrypted])
    .then(r => {
      console.log(r)
      res.send({ keyEncrypted });
    })
    .catch(err => {
      console.log(err)
      res.send({err})
    })
  }else{
    res.send(rows.rows[0]);
  }
});

app.listen(5000, err => {
  console.log('Listening');
});
