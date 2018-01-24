import fetch from 'isomorphic-fetch';
import { utils } from 'react-universal-ui';

export function apiFetch(url, vars = {}) {
	return new Promise((resolve, reject) => {
		const fullUrl = utils.isServer ? `http://localhost:3005${url}` : url,
			headers = { Accept: 'application/json', 'Content-Type': 'application/json', };

		fetch(fullUrl, { method: 'POST', headers, body: JSON.stringify(vars), })
			.then(response => resolve(response.json()))
			.catch(error => reject(error));
	});
}

global.apiFetch = apiFetch;