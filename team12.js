
var express = require('express');
var path = require('path');
var session = require('express-session');

const app = express();

// set up sessions
app.use(session({
    secret: 'my-super-secret-secret!',
    resave: false,
    saveUninitialized: true
  })) 


const PORT = process.env.PORT || 5000;



app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.use(logRequest);

app.post('/login', handleLogin);

app.post('/logout', handleLogout);

// This method has a middleware function "verifyLogin" that will be called first
app.get('/getServerTime', verifyLogin, getServerTime);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


function handleLogin(req, res) {
	var result = {success: false};

	if (req.body.username == 'admin' && req.body.password == 'password') {
		req.session.user = req.body.username;
		result = {success: true};
	}

    res.json(result);
}


// If a user is currently stored on the session, removes it
function handleLogout(req, res) {
	var result = {success: false};

	if (req.session.user) {
		req.session.destroy();
		result = {success: true};
	}

	res.json(result);
}


// This function returns the current server time
function getServerTime(req, res) {
	var time = new Date();
	
	var result = {success: true, time: time};
	res.json(result); 
}

// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(req, res, next) {
	if (req.session.user) {
		// They are logged in!

		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {success:false, message: "Access Denied"};
		res.status(401).json(result);
	}
}


function logRequest(req, res, next) {
	console.log("Received a request for: " + req.url);

	// don't forget to call next() to allow the next parts of the pipeline to function
	next();
}