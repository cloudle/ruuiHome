import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppRegistry } from 'react-native';
import { matchPath } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { utils } from 'react-universal-ui';

import App from '../';
import { getMarkdown } from './markdownSource';
import { routes } from '../router';

const router = Router();

AppRegistry.registerComponent('App', () => App);

router.use('/markdown', cors(), bodyParser.json(), (req, res, next) => {
	const { group, id } = req.body;
	getMarkdown(group, id).then((data) => {
		res.json({ data });
	});
});

router.use('*', (req, res, next) => {
	let matchedPattern = {}, matchedRoute;

	for (const route of routes) {
		const match = matchPath(req.baseUrl, route);

		if (match) {
			matchedPattern = match; matchedRoute = route;
			break;
		}
	}

	if (matchedRoute && matchedRoute.component) {
		if (matchedRoute.component.getInitialProps) {
			const getInitialProps = matchedRoute.component.getInitialProps,
				initialProps = getInitialProps(matchedPattern, utils.isServer, req) || {};

			if (initialProps.then) {
				initialProps.then((promisedInitialProps) => {
					responseApplicationSsr(req, res, next, promisedInitialProps);
				});
			} else {
				responseApplicationSsr(req, res, next, initialProps);
			}
		} else {
			responseApplicationSsr(req, res, next);
		}
	} else next();
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

module.exports = router;