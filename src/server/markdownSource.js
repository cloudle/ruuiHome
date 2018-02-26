import { readFile } from 'fs';
import { join as joinPath } from 'path';

const fileCache = {
	headingConfigs: '',
};

readFile(joinPath(__dirname, '../markdowns', 'headingConfigs.md'), (error, data) => {
	if (!error) fileCache.headingConfigs = data.toString();
});

export function getMarkdown(group, id) {
	return new Promise((resolve, reject) => {
		const existingCache = fileCache[`${group}:${id}`];

		if (existingCache) {
			resolve(`${fileCache.headingConfigs}${existingCache}`);
		} else {
			const fileLocation = joinPath(__dirname, '../markdowns', group, `${id}.md`);
			readFile(fileLocation, (error, data) => {
				if (error) return resolve(`## Oops!!!\nCouldn't find **${group}/${id}** documentation, it may been removed or temporary unavailable to access, try again latter!`);
				else {
					const markdown = data.toString();

					fileCache[`${group}:${id}`] = markdown;
					return resolve(`${fileCache.headingConfigs}${markdown}`);
				}
			});
		}
	});
}