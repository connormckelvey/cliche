var argv = require('minimist')(process.argv.slice(2));
var controllers = require('../controllers/index');

var cliche = function() {
	var run = function() {
		console.log(commands[0]);
	};
	var commands = [];
	var controllers = function(){};
	return {
		start: function() {
			run();
		},
		command: function(name, options) {
			var command = {};
			command[name] = options;
			commands.push(command);
			console.log(commands);
		}, 
		controller: function(name, callback) {
			controllers.prototype[name] = callback;
		}
	}
};

module.exports = new cliche();