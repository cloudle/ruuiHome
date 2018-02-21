import { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { AppRegistry } from 'react-native';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';

import App from '../index';
import { getMarkdown } from './markdownSource';
import routes from '../routes';
import { fetchInitialProps } from './utils';
import * as webpackConfigs from '../../webpack.config';

const router = Router();

AppRegistry.registerComponent('App', () => App);

router.use('/markdown', cors(), bodyParser.json(), (req, res, next) => {
	const { group, id } = req.body;
	getMarkdown(group, id).then((data) => {
		res.json({ data });
	});
});

router.use('*', (req, res, next) => {
	const branches = matchRoutes(routes, req.baseUrl);

	/* initialProps fetch that do server-side-data fetching using [branch]
	 * routeScene implement getInitialProps
	 * server side fetch it and inject as stringified-json to template
	 * client-side parse and take that on first load, fetch them by itself on next client-re-render..
	 * */

	fetchInitialProps(branches).then((prefetchProps) => {
		const initialProps = { ssrLocation: req.baseUrl, ssrContext: prefetchProps },
			{ element, getStyleElement } = AppRegistry.getApplication('App', { initialProps, rootTag: 'root' }),
			initialHtml = renderToString(element),
			initialStyles = renderToStaticMarkup(getStyleElement());

		res.render('../index', {
			initialProps: prefetchProps,
			initialStyles,
			initialHtml,
			serverSide: true,
			publicPath: webpackConfigs.output.publicPath,
		});
	});
});

module.exports = router;