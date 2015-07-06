var app = require('../lib/cliche');
module.exports = app.controller('test', function(options){
	setTimeout(function(){
		console.log('i work!');
	}, 2000);
});