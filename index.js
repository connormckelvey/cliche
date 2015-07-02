var app = require('./lib/cliche');

app.command('git', {
	alias: 'g',
	controller: 'test',
	prompt: 'prompts/init'
});

app.start();