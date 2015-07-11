var argv = require('minimist')(process.argv.slice(2));
var colors = require('colors');

var Command = require('./command');
var Controller = require('./controller');
var Input = require('./input');
var Loader = require('./loader');
var Help = require('./help');

function Cliche() {
	this.configs = {
		bin: 'default'
	};
	this.commands = {};
	this.controllers = {};
}


Cliche.prototype.name = function(name) {
	this.configs.name = name;
	return this;
};

Cliche.prototype.bin = function(bin) {
	this.configs.bin = bin;
	return this;
};

Cliche.prototype.version = function(version) {
	this.configs.version = version;
	return this;
};

Cliche.prototype.command = function(name, options) {
	var cmd = new Command(name, options);

	if(!this.commands.hasOwnProperty(name)) {
		this.commands[name] = cmd;
		return this;

	} else {
		throw new Error('Cannot define command: ' + name + ' twice');
	}
};

Cliche.prototype.controller = function(name, action) {
	var ctrl = new Controller(name, action);

	if(!this.controllers.hasOwnProperty(name)) {
		this.controllers[name] = ctrl;
		return this;
	} else {
		throw new Error('Cannot define controller' + name + ' twice');
	}
};

Cliche.prototype.printHelp = function(command) {
	var man = new Help(this.commands, command, this.configs);
	console.log(man.desc);
	console.log(man.usage);
	console.log(man.params);
	console.log(man.commands);
	process.exit();
};

Cliche.prototype.executeCommand = function(command, options) {

	var systemCommand = this.commands[command];
	var systemController = this.controllers[systemCommand['controller']];
	var systemControllerParams =
		systemController.toString().match(/\(.*?\)/)[0].replace(/[()]/gi,'').replace(/\s/gi,'').split(',');
	var systemControllerArgs = [];


	if(options.help) {
		this.printHelp(systemCommand);
	}
	//Build args to be passed into Controller
	systemControllerParams.forEach(function(el){
		systemControllerArgs.push(options[el])
	});

	try {
		systemController.apply(this, systemControllerArgs || []);
	}
	catch(e) {
		console.error(e);
	}

};

Cliche.prototype.run = function(){

	Loader('commands/');
	Loader('controllers/');

	var input = new Input(this.commands, argv, this.configs);
	var userCommand = input.userCommand;
	var userOptions = input.userOptions;

	this.executeCommand(userCommand, userOptions);

};

exports = module.exports = new Cliche();
