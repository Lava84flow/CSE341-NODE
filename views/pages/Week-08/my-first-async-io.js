var splitstring = '';

const fs = require('fs');

var ourstring =  fs.readFile(process.argv[2], callback);

function callback(err, data){
	if (err) { return console.error(err); }
	splitstring = data.toString().split('\n').length -1;	
	console.log(splitstring);
}

