import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { utils, RuuiProvider, } from 'react-universal-ui';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import { store } from './store';
import { Router } from './utils';

type ContainerProps = {
	ssrLocation?: string,
	ssrContext?: Object,
};

export default function AppContainer(props: ContainerProps) {
	const routerProps = utils.isServer ? {
		location: props.ssrLocation,
		context: props.ssrContext,
	} : {};

	return <RuuiProvider>
		<Provider store={store}>
			<Router {...routerProps}>
				{renderRoutes(routes)}
			</Router>
		</Provider>
	</RuuiProvider>;
}