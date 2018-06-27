import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import bodyParser from 'body-parser';
import { AppRegistry } from 'react-native';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import { getEjsTemplate } from 'react-universal-ui/cli-local/util/paths';
import cors from 'cors';

import App from '../index';
import { getMarkdown } from './markdownSource';
import { fetchInitialProps } from './utils';
import routes from '../routes';
import appJson from '../../app.json';
import ruuiJson from '../../web/ruui.json';

let ruuiConfigs = {};
const router = Router(),
	isProduction = process.env.ENV === 'production',
	ruuiConfigPath = path.resolve(process.cwd(), 'ruui.config.js');

if (fs.existsSync(ruuiConfigPath)) ruuiConfigs = require(ruuiConfigPath);

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
			initialStyles = renderToStaticMarkup(getStyleElement()),
			pageTemplate = getEjsTemplate();

		res.render(pageTemplate, {
			ssrContext: {
				initialProps: prefetchProps,
				initialStyles,
				initialHtml,
				serverSide: true,
				publicPath: ruuiConfigs.publicPath || '/',
				appName: appJson.displayName || appJson.name,
				buildId: ruuiJson.buildId,
				isProduction,
				...ruuiConfigs.ejsTemplate,
			},
		});
	});
});

module.exports = router;
