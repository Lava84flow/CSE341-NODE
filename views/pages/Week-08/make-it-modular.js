const filterFn = require('./mymodule.js');
const directory = process.argv[2];
const filename = process.argv[3];

filterFn(directory, filename, function (err, list){
	if (err){
		return console.error('There was an error:', err);
	}
	
	list.forEach(function (file) {
		console.log(file);
	})
	
})

