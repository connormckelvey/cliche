var app = require('../lib/cliche');
module.exports = app.command('git', {
	desc: 'Version control command',
	controller: 'test',
	params: [
		{ 
			name: 'test',
			alias: 't',
			required: true,
			validation: 'boolean'
		},
		{                                     
			name: 'url',
			alias: 'u', 
			required: false,
			validation: 'string'
		}
	]
});