import patterns from './_patterns.js';

const contents = JSON.stringify(patterns.map(pattern => {
	return {
		title: pattern.title,
		slug: pattern.slug,
		width: pattern.width,
		height: pattern.height,
		path: pattern.path,
		mode: pattern.mode
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}