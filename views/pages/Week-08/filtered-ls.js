const ourpath = require("path");
const fs = require("fs");

var dirtree = fs.readdir(process.argv[2], callback);

function callback(err, data){
		for (let i=0; i < data.length-1; i++){
			if (data[i].includes('.' + process.argv[3])){
				console.log(data[i]);				
			}
		}

}


//const tree = dirTree(parse);

//console.log(tree);