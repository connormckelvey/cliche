'use strict';

function Command(name, options) {
	if(typeof name === 'undefined' || typeof options === 'undefined') {
		throw new Error('command requires name and options');
	} else {
		options.name = name;
		return options;
	}
}

exports = module.exports = Command;

