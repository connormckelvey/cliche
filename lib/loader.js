var path = require('path');
var fs = require('fs');
module.exports = function loadAssets(dir) {
	var cwd = process.cwd();
	var normalizedPath = path.join(cwd, dir);

	fs.readdirSync(normalizedPath).forEach(function(file) {
  		require(path.join(normalizedPath, file));
	});
}
