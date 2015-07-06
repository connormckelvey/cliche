module.exports = function loadAssets(path) {
	var normalizedPath = require("path").join(__dirname, path);

	require("fs").readdirSync(normalizedPath).forEach(function(file) {
  		require(path + file);
	});
}