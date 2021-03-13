const fs = require('fs');

var ourstring =  fs.readFileSync(process.argv[2]);

var splitstring = ourstring.toString().split('\n').length -1;

console.log(splitstring);