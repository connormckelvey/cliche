var argv = require('minimist')(process.argv.slice(2));
var colors = require('colors');

var Command = require('./command');
var Controller = require('./controller');
var Input = require('./input');


function Cliche() {
	this.commands = {};
	this.controllers = {};	
}

Cliche.prototype.command = function(name, options) {
	var cmd = new Command(name, options);

	if(!this.commands.hasOwnProperty(name)) {
		this.commands[name] = cmd;
		return cmd;

	} else {
		throw new Error('Cannot define command: ' + name + ' twice');
	}
}; 

Cliche.prototype.controller = function(name, action) {
	var ctrl = new Controller(name, action);

	if(!this.controllers.hasOwnProperty(name)) {
		this.controllers[name] = ctrl;
	} else {
		throw new Error('Cannot define controller' + name + ' twice');
	}
};

Cliche.prototype.executeCommand = function(command, options) {

	var systemCommand = this.commands[command];
	var systemController = this.controllers[systemCommand['controller']];

	try {
		systemController(options);
	}
	catch(e) {
		console.error(e);
	}
	
};

Cliche.prototype.printHelp = function(command) {
	var systemCommand = this.commands[command];

	function printUsage(title, desc, params) {

		var paramsText = '';

		params.forEach(function(e, i, a) {
			var str  = '[';
					str += '-'+e.alias;
					str += '|--'+e.name;
					str += '] ';

			paramsText += str;
		});

		console.log('Usage: '.bold + '\t' + title + ' ' + paramsText);
	}

	printUsage(systemCommand.name, systemCommand.desc, systemCommand.params);
};

Cliche.prototype.run = function(){

	try {
		var input = new Input(this.commands, argv),
				userCommand = input.command,
				userOptions = input.options;
	}
	catch(e) {
		console.error(e);
		process.exit(1);
	}

	this.executeCommand(userCommand, userOptions);
	this.printHelp('git');

}; 

exports = module.exports = new Cliche();