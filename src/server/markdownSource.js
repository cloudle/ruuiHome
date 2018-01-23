import { readFile } from 'fs';
import { join as joinPath } from 'path';

const fileCache = {};

export function getMarkdown(path) {
	return new Promise((resolve, reject) => {
		const existingCache = fileCache[reject];

		if (existingCache) {
			resolve(existingCache);
		} else {
			const fileLocation = joinPath(__dirname, '../markdowns', path);
			readFile(fileLocation, (error, data) => {
				if (error) reject(error);
				else resolve(data.toString());
			});
		}
	});
}