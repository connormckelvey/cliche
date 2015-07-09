'use strict';

function validateCommand(systemCommands, userCommand) {
	if(systemCommands.hasOwnProperty(userCommand)) {
		return userCommand;
	} else {
		throw new Error('Command ' + userCommand.split('.').join(' ') + ' not found');
	}
}

function expandOptions(systemOptions, userOptions) {
	var expandedOptions = {};

	for(var userOption in userOptions) {
		for(var i = 0; i < systemOptions.length; i++){
			var systemOption = systemOptions[i];

			//Word
			if(userOption.length > 1) {
				if(userOption === systemOption.name) {
					expandedOptions[systemOption.name] = userOptions[userOption];
					break;
				} else {
					throw new Error('Option ' + userOption + ' not found');
				}
			}

			//Letter
			else {
				if(userOption === systemOption.alias) {
					expandedOptions[systemOption.name] = userOptions[userOption];
					break;
				} else {
					throw new Error('Option ' + userOption + ' not found');
				}
			}

		}
	}

	return expandedOptions;
}

function Input(systemCommands, args) {
	var systemOptions;
	var userCommand = args['_'].length === 0 ? 'default' : args['_'].join('.');
	var userOptions = args;
	delete userOptions['_'];

	try {
		this.userCommand = validateCommand(systemCommands, userCommand);
		systemOptions = systemCommands[userCommand].params;
	} catch(e) {
		console.error(e);
	//	process.exit(1);
	}

	try {
		this.userOptions = expandOptions(systemOptions, userOptions);
	} catch(e) {
		console.error(e);
	//	process.exit(1);
	}

}

exports = module.exports = Input;
