function Controller(name, action) {
	if(typeof name === 'undefined' || typeof action !== 'function') {
		throw new Error('Controller requires name and action');
	} else {

		return action;
	}
};

exports = module.exports = Controller;


// var obj = [];
// 	//'(a, b, c, d, e, f)'
// 	var tmp = arguments.callee.toString().match(/\(.*?\)/)[0];
// 	//["a", "b", "c", "d", "e", "f"]
// 	var argumentNames = tmp.replace(/[()\s]/g,'').split(',');
//
// 	[].splice.call(arguments,0).forEach(function(arg,i) {
// 			obj.push({
// 					// question is how to get variable name here?
// 					name: argumentNames[i],
// 					value: arg
// 			})
// 	});
// 	console.log( obj );
