var app = require('../lib/cliche');
module.exports = app.command('git.remote', {
	controller: 'rteest',
	prompt: 'prompts/init'
});