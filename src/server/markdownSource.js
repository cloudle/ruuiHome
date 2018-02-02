import { readFile } from 'fs';
import { join as joinPath } from 'path';

const fileCache = {};

export function getMarkdown(group, id) {
	return new Promise((resolve, reject) => {
		const existingCache = null;//fileCache[reject];

		if (existingCache) {
			resolve(existingCache);
		} else {
			const fileLocation = joinPath(__dirname, '../markdowns', group, `${id}.md`);
			readFile(fileLocation, (error, data) => {
				if (error) resolve(`## Oops!!!\nCouldn't find **${group}/${id}** documentation, it may been removed or temporary unavailable to access, try again latter!`);
				else resolve(data.toString());
			});
		}
	});
}