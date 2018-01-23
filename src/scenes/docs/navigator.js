import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, } from 'react-native';

import MenuItem from './menuItem';
import { sizes, siteConfigs } from '../../utils';

type Props = {

};

export default class DocNavigator extends Component {
	props: Props;

	render() {
		const configs = siteConfigs.docs || {},
			menuItems = configs.menuItems || [];

		return <ScrollView style={styles.container}>
			{menuItems.map((menu) => {
				return <MenuItem key={menu.url} {...menu}/>;
			})}
		</ScrollView>;
	}
}

const styles = StyleSheet.create({
	container: {
		zIndex: 20, backgroundColor: '#fff5f5',
		position: 'fixed', top: sizes.navigationHeight, left: 0, bottom: 0,
		width: sizes.sideBarWidth, padding: 20, paddingRight: 0,
		borderRightWidth: 1, borderColor: '#f2f2f2',
	},
});