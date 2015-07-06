var app = require('../lib/cliche');
module.exports = app.command('default', {
	desc: 'This is the default command',
	controller: 'test'
})