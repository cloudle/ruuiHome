import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppRegistry } from 'react-native';
import { matchPath } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import App from '../';
import { getMarkdown } from './markdownSource';
import { routes } from '../router';

const router = Router();

AppRegistry.registerComponent('App', () => App);

router.use('/markdown', cors(), bodyParser.json(), (req, res, next) => {
	const { path } = req.body;
	getMarkdown(path).then(data => res.json({ data }));
});

router.use('*', (req, res, next) => {
	let matchedPattern, matchedRoute;

	routes.some((route) => {
		const match = matchPath(req.baseUrl, route);

		if (match) {
			matchedPattern = match;
			matchedRoute = route;
			return match;
		}
	});

	if (matchedRoute && matchedRoute.component && matchedRoute.component.getInitialProps) {
		const getInitialProps = matchedRoute.component.getInitialProps;

		getInitialProps(matchedPattern, req).then((initialProps) => {
			responseApplicationSsr(req, res, next, initialProps);
		});
	} else responseApplicationSsr(req, res, next);
});

function responseApplicationSsr(req, res, next, initialProps = {}) {
	const { element, stylesheets } = AppRegistry.getApplication('App', {
			rootTag: 'root',
			initialProps: {
				ssrLocation: req.baseUrl,
				ssrContext: initialProps,
			},
		}),
		initialHtml = renderToString(element),
		initialStyles = stylesheets.map(sheet => renderToStaticMarkup(sheet)).join('\n');

	res.render('../index', {
		initialProps,
		initialStyles,
		initialHtml,
		serverSide: true
	});
}

function defaultGetInitialProps() {
	return new Promise(resolve => resolve({}));
}

module.exports = router;