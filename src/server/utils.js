export function fetchInitialProps(branches) {
	return new Promise((resolve, reject) => {
		const propsPromises = [];
		for (const branch of branches) {
			const { getInitialProps = defaultGetInitialProps } = branch.route.component,
				initialProps = getInitialProps(branch.match),
				propsPromise = initialProps.then ? initialProps : forcedPromise(initialProps);

			propsPromises.push(propsPromise);
		}

		Promise.all(propsPromises).then((results) => {
			const response = {};
			for (let i = 0; i < results.length; i += 1) {
				response[branches[i].route.component.displayName] = results[i];
			}
			resolve(response);
		}).catch(errors => reject(errors));
	});
}

const defaultGetInitialProps = () => ({});

function forcedPromise(props = {}) {
	return new Promise((resolve, reject) => resolve(props));
}