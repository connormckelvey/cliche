var app = require('./lib/cliche');


app.command('default', {
	desc: 'This is the default command',
	controller: 'test'
})

app.command('git', {
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

// app.command('git.remote', {
// 	controller: 'rteest',
// 	prompt: 'prompts/init'
// });

app.controller('test', function(options){

	setTimeout(function(){
		console.log(options);
	}, 2000);
});


app.controller('rteest', function(options){
	console.log('lolasdasdasdasds');
});


app.run();