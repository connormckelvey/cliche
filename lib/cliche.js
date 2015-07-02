var argv = require('minimist')(process.argv.slice(2));
var controllers = require('../controllers/index');

var cliche = function() {
	var run = function() {
		console.log(argv);
	};
	var commands = [];
	return {
		start: function() {
			run();
		},
		command: function(name, options) {
			var command = {};
			command[name] = options;
			commands.push(command);
			console.log(commands);
		}
	}
}

module.exports = new cliche();