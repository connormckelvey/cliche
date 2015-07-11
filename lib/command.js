'use strict';

function addHelp(opts) {
	if(!opts.params) {
		opts.params = [];
	}

	opts.params.push({
		name: 'help',
		alias: 'h',
		validation: 'boolean'
	});

	return opts;
}

function Command(name, options) {
	if(typeof name === 'undefined' || typeof options === 'undefined') {
		throw new Error('command requires name and options');
	} else {
		options.name = name;

		if(options.help) {
			return addHelp(options);
		}
		return options;
	}
}

exports = module.exports = Command;
