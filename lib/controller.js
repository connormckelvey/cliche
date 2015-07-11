function Controller(name, action) {
	if(typeof name === 'undefined' || typeof action !== 'function') {
		throw new Error('Controller requires name and action');
	} else {
		return action;
	}
};

exports = module.exports = Controller;
