'use strict';

var commandIsValid = function(commands, command) {
	if(commands.hasOwnProperty(command)) {
		return true;
	}
	 return false;
}

function Input(commands, args) {
	this.command = args['_'].length === 0 ? 'default' : args['_'].join('.');
	this.options = args;

	delete this.options['_'];

	
	if(!commandIsValid(commands, this.command)) {
		throw new Error('Command ' + this.command.split('.').join(' ') + ' not found');
	}
}

Input.prototype.validator = function() {
	var promise = new Promise(function(resolve, reject) {

		var errors = [];

		args.forEach(function(e, i, a){
			console.log('params' + e.name);
		});

		console.log(input);

		if (errors.length === 0) {
		  resolve("Stuff worked!");
		}
		else {
		  reject(Error("It broke"));
		}
	});

	return promise;
}

exports = module.exports = Input;

