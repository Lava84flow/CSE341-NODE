const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

express().use(bodyParser.urlencoded({extended: true}));

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/mathform', (req, res) => res.render('pages/Week-09/mathform'))
  .get('/math', (req, res) => {console.log('you are at math results'); /*console.log(simpleMath(parseFloat(req.query.left), req.query.operator, parseFloat(req.query.right)));*/ res.render('pages/Week-09/mathresults', { left : req.query.left, operator: req.query.operator, right: req.query.right, result: simpleMath(parseFloat(req.query.left), req.query.operator, parseFloat(req.query.right)) })})
  
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


simpleMath = (left, operator, right) => {
  switch(operator) {
    case 'add':
      return left + right;
      break;
    case 'subtract':
      return left - right;
      break;
    case 'multiply':
      return left * right;
      break;
    case 'divide':
      return left / right;
      break;
  }
}

showTimes = () => {
  let result = '';
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + ' ';
  }
  return result;
}