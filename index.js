var cool = require('cool-ascii-faces');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const PORT = process.env.PORT || 5000;
const app = express();



var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.get('/cool', (req, res) => res.send(cool()))
  app.get('/times', (req, res) => res.send(showTimes()))
  app.get('/mathform', (req, res) => res.render('pages/Week-09/mathform'))
  app.get('/math', (req, res) => {console.log('you are at math results'); /*console.log(simpleMath(parseFloat(req.query.left), req.query.operator, parseFloat(req.query.right)));*/ res.render('pages/Week-09/mathresults', { left : req.query.left, operator: req.query.operator, right: req.query.right, result: simpleMath(parseFloat(req.query.left), req.query.operator, parseFloat(req.query.right)) })})
  
  app.get('/db', async (req, res) => {
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

  app.get('/postalrate', (req, res) => res.render('pages/postalrateform'))
  app.get('/postalresults', (req, res) => {
    /*console.log(postalRateCalc(parseFloat(req.query.weight)
    , req.query.mailtype
  ))*/;
    res.render('pages/postalrateresults'
    , { weight: req.query.weight
      , price: postalRateCalc(parseFloat(req.query.weight), req.query.mailtype) 
    })
  })

  app.get('/getAddresses', getAddresses);

  app.get('/getOrders', getOrders);

  app.get('/getEmails', getEmails);

  app.get('/getUsers', getUsers);

  app.post('/saveCustomer', handleSaveCustomer);

  app.post('/login', handleLogin);

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


  function handleSaveCustomer(req, res) {
    

    var fname = req.body.first_name;
    var lname = req.body.last_name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    /*
console.log(fname);
console.log(lname);
console.log(username);
console.log(email);
console.log(password)
*/
    
    var hashed_password = bcrypt.hashSync(password, salt);
  
//console.log(hashed_password);

    const sql = "INSERT INTO anniesattic.customers (first_name, last_name, username, email, password) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text);";
  
    const params = [fname, lname, username, email, hashed_password];
    
    pool.query(sql, params, function(err, res) {
      //var result = {success: false};
        if (err) {
          //result = {success: false};
          console.log(err);
            
        } /*else { 
          return result = {success: true};
        }*/
        //console.log(result)
        //res.json(result);
        //callback(null, res.rows[0]);
    });

    //console.log(result)
    //res.json(result);

  }

  function handleLogin(req, res) {
    var result = {success: false};

    username = req.body.username;
    password = req.body.password;


    checkUsers(username, function(error, result) {
      const user = result;
      console.log(user)

      response.status(200).json(user);
  });
  
//console.log(user);
/*
  if (user.length == 0) {
    console.log("NO RESULTS");
  }
*/
  /*
    if (req.body.username == 'admin' && req.body.password == 'password') {
      req.session.user = req.body.username;
      result = {success: true};
    }
  */
      //res.json(result);
  }
  
  function checkUsers(username, callback) {
    const sql = "SELECT idcustomers, first_name, last_name, username, password FROM anniesattic.customers WHERE username = $1::text;";
    
    const params = [username];
    
    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log(err);
        }
        
        callback(null, result.rows[0]);
    });
  }



  function getEmails (request, response) {
    const email = request.query.email;
    
    getEmailsFromDB(email, function(error, result) {
        const email = result;
        response.status(200).json(email);
    })
  }
  
  function getEmailsFromDB(email, callback) {
    const sql = "SELECT idcustomers FROM anniesattic.customers WHERE email = $1::text";
    
    const params = [email];
    
    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log(err);
        }
        
        callback(null, result.rows);
    });
  }
  

  function getUsers (request, response) {
    const username = request.query.username;
    
    getUsersFromDB(username, function(error, result) {
        const username = result;
        response.status(200).json(username);
    })
  }
  
  function getUsersFromDB(user, callback) {
    const sql = "SELECT idcustomers FROM anniesattic.customers WHERE username = $1::text";
    
    const params = [user];
    
    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log(err);
        }
        
        callback(null, result.rows);
    });
  }






  function getAddresses (request, response) {
    const id = request.query.id;
    
    getAddressesFromDB(id, function(error, result) {
        const address = result;
        response.status(200).json(address);
    })
}

function getAddressesFromDB(id, callback) {
    const sql = "SELECT idaddresses, address_type, address_line1, address_line2, city, state, zipcode FROM anniesattic.addresses WHERE customers_idcustomers = $1::int";
    
    const params = [id];
    
    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log(err);
        }
        
        callback(null, result.rows);
    });
}


function getOrders (request, response) {
  const id = request.query.id;
  
  getOrdersFromDB(id, function(error, result) {
      const order = result;
      response.status(200).json(order);
  })
}

function getOrdersFromDB(id, callback) {
  const sql = "SELECT * FROM anniesattic.orders o JOIN anniesattic.customers c ON o.customers_idcustomers = c.idcustomers WHERE c.idcustomers = $1::int";
  
  const params = [id];
  
  pool.query(sql, params, function(err, result) {
      if (err) {
          console.log(err);
      }
      
      callback(null, result.rows);
  });
}


postalRateCalc = (weight, mailtype) => {

  var err='';

  switch(mailtype) {
    case 'stamped':
      if(weight <= 3.5) {
        return formatter.format(1.15);
      } else if(weight <= 3) {
        return formatter.format(0.95);
      } else if(weight <= 2) {
        return formatter.format(0.75);
      } else if(weight <= 1) {
        return formatter.format(0.55);
      } else {
        return err = ' Error: Stamped Packages must be no more than 3.5 ounces'
      }
      break;
    case 'metered':
      if(weight <= 3.5) {
        return formatter.format(1.11);
      } else if(weight <= 3) {
        return formatter.format(0.91);
      } else if(weight <= 2) {
        return formatter.format(0.71);
      } else if(weight <= 1) {
        return formatter.format(0.51);
      } else {
        return err = ' Error: Metered Packages must be no more than 3.5 ounces'
      }
      break;
    case 'flats':
      if(weight <= 13) {
        return formatter.format(3.40);
      } else if(weight <= 12) {
        return formatter.format(3.20);
      } else if(weight <= 11) {
        return formatter.format(3.00);
      } else if(weight <= 10) {
        return formatter.format(2.80);
      } else if(weight <= 9) {
        return formatter.format(2.60);
      } else if(weight <= 8) {
        return formatter.format(2.40);
      } else if(weight <= 7) {
        return formatter.format(2.20);
      } else if(weight <= 6) {
        return formatter.format(2.00);
      } else if(weight <= 5) {
        return formatter.format(1.80);
      } else if(weight <= 4) {
        return formatter.format(1.60);
      } else if(weight <= 3) {
        return formatter.format(1.40);
      } else if(weight <= 2) {
        return formatter.format(1.20);
      } else if(weight <= 1) {
        return formatter.format(1.00);
      } else {
        return err = ' Error: Flat Packages must be no more than 13 ounces'
      }
      break;
    case 'retail':
      if(weight <= 13) {
        return formatter.format(6.25);
      } else if(weight <= 12) {
        return formatter.format(5.50);
      } else if(weight <= 11) {
        return formatter.format(5.50);
      } else if(weight <= 10) {
        return formatter.format(5.50);
      } else if(weight <= 9) {
        return formatter.format(5.50);
      } else if(weight <= 8) {
        return formatter.format(4.80);
      } else if(weight <= 7) {
        return formatter.format(4.80);
      } else if(weight <= 6) {
        return formatter.format(4.80);
      } else if(weight <= 5) {
        return formatter.format(4.80);
      } else if(weight <= 4) {
        return formatter.format(4.00);
      } else if(weight <= 3) {
        return formatter.format(4.00);
      } else if(weight <= 2) {
        return formatter.format(4.00);
      } else if(weight <= 1) {
        return formatter.format(4.00);
      } else {
        return err = ' Error: Retail Packages must be no more than 13 ounces'
      }
      break;
  }
}

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