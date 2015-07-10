var argv = require('minimist')(process.argv.slice(2));
var colors = require('colors');

var Command = require('./command');
var Controller = require('./controller');
var Input = require('./input');
var Loader = require('./loader');
var Help = require('./help');

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
	var systemControllerParams =
		systemController.toString().match(/\(.*?\)/)[0].replace(/[()]/gi,'').replace(/\s/gi,'').split(',');
	var systemControllerArgs = [];

	//Build args to be passed into Controller
	systemControllerParams.forEach(function(e){
		systemControllerArgs.push(options[e])
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

	var input = new Input(this.commands, argv);
	var userCommand = input.userCommand;
	var userOptions = input.userOptions;

	this.executeCommand(userCommand, userOptions);
	//console.log(new Help(this.commands, 'git').usage)

};

exports = module.exports = new Cliche();
