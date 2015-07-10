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
	var validationAttemps = {};

	for(var userOption in userOptions) {

		// Start counting validation attempts
		// when cound reaches length of systemOptions,
		// the option is invalid
		validationAttemps[userOption] = 0;

		for(var i = 0; i < systemOptions.length; i++){
			var systemOption = systemOptions[i];

			//Word
			if(userOption.length > 1) {
				if(userOption === systemOption.name) {
					expandedOptions[systemOption.name] = userOptions[userOption];
					continue;
				} else {
					validationAttemps[userOption]++;
				}
			}

			//Letter
			else {
				if(userOption === systemOption.alias) {
					expandedOptions[systemOption.name] = userOptions[userOption];
					continue;
				} else {
					validationAttemps[userOption]++;
				}
			}

		}

		//Option not found, throw error
		if(validationAttemps[userOption] === systemOptions.length) {
			throw new Error('Option ' + userOption + ' not found');
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
		process.exit(1);
	}

	try {
		this.userOptions = expandOptions(systemOptions, userOptions);
	} catch(e) {
		console.error(e);
		process.exit(1);
	}

}

exports = module.exports = Input;
