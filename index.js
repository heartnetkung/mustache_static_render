const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const mustache = require('mustache');
mustache.tags = ['$$', '$$'];

exports.getFiles = function(folder) {
	return new Promise((res, rej) => {
		var folder2 = /[/\\]$/.test(folder) ?
			folder.substring(0, folder.length - 1) :
			folder;
		glob(folder2 + '/**', { nodir: true }, (err, ans) => {
			if (err) return rej(err);
			var ans2 = ans.map((real) => ({
				real,
				relative: path.relative(folder, real)
			}));
			return res(ans2);
		});
	});
};

const main = async(INPUT_FOLDER, DATA_FOLDER, OUTPUT_FOLDER) => {
	var allData = {};
	var dataFolder = await exports.getFiles(DATA_FOLDER);
	for (var dataPath of dataFolder) {
		var content = fs.readFileSync(dataPath.real, 'utf8');
		if (/\.json$/i.test(dataPath.real))
			try {
				content = JSON.parse(content);
			} catch (e) {
				throw new Error('JSON parsing error: ' + dataPath.real);
			}
		allData[dataPath.relative.split('.')[0]] = content;
	}
	// console.log(JSON.stringify(allData, null, 2));

	var inputFolder = await exports.getFiles(INPUT_FOLDER);
	for (var inputPath of inputFolder) {
		var content = fs.readFileSync(inputPath.real, 'utf8');
		var outputPath = path.join(OUTPUT_FOLDER, inputPath.relative);
		mkdirp.sync(path.dirname(outputPath));
		var output = mustache.render(content, allData);
		fs.writeFileSync(outputPath, output);
	}
};

(async() => {
	try {
		if (require.main !== module)
			return;
		await main(process.argv[2], process.argv[3], process.argv[4]);
	} catch (e) {
		console.error(e);
		process.exit(1)
	}
})();