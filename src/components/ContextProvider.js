import React, { Component } from 'react';
import { NetInfo, Dimensions, View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { utils, ruuiActions } from 'react-universal-ui';

import type { Element, Style } from '../typeDefinition';

type Props = {
	children?: Element,
	store?: Object,
	styles?: Style,
	themeConfigs?: Object,
};

export default class ContextProvider extends Component {
	props: Props;

	componentWillMount() {
		if (!utils.isServer) this.subscribeAndUpdateNetworkInfo();
		if (!utils.isWeb) this.subscribeAndUpdateDimensions();
	}

	componentDidMount() {
		if (utils.isBrowser) this.subscribeAndUpdateDimensions();
	}

	componentWillUnmount() {
		// if (!utils.isServer && this.props.store) {
		// 	NetInfo.removeEventListener(
		// 		'connectionChange', this.handleConnectionTypeChange);
		// 	NetInfo.isConnected.removeEventListener(
		// 		'connectionChange', this.handleIsConnectedChange);
		// }
	}

	render() {
		const reduxStore = this.props.store;

		return <View style={[styles.container, this.props.styles]}>
			{reduxStore ? <Provider store={reduxStore}>
				{this.props.children}
			</Provider> : this.props.children}
		</View>;
	}

	subscribeAndUpdateDimensions = () => {
		this.handleDimensionChange({
			window: Dimensions.get('window'),
			screen: Dimensions.get('screen'),
		});

		Dimensions.addEventListener('change', this.handleDimensionChange);
	};

	handleDimensionChange = (data) => {
		this.props.store.dispatch(ruuiActions.updateDimensionsInfo(data));
	};

	subscribeAndUpdateNetworkInfo = () => {
		NetInfo.getConnectionInfo && NetInfo.getConnectionInfo()
			.then(connectionInfo => this.handleConnectionTypeChange(connectionInfo));

		NetInfo.isConnected.getConnectionInfo && NetInfo.isConnected.getConnectionInfo()
			.then(isConnected => this.handleIsConnectedChange(isConnected));

		NetInfo.addEventListener(
			'connectionChange', this.handleConnectionTypeChange);
		NetInfo.isConnected.addEventListener(
			'connectionChange', this.handleIsConnectedChange);
	};

	handleConnectionTypeChange = (connectionType) => {
		this.props.store.dispatch(ruuiActions.updateNetInfo({ connectionType, }));
	};

	handleIsConnectedChange = (isConnected) => {
		this.props.store.dispatch(ruuiActions.updateNetInfo({ isConnected, }));
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});