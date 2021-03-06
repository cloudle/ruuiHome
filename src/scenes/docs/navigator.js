import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { utils } from 'react-universal-ui';
import { connect } from 'react-redux';
import animateScrollTo from 'animated-scroll-to';

import ScrollView from '../../components/scrollView';
import MenuItem from './menuItem';
import { sizes, withRouter, siteConfigs } from '../../utils';
import type { RouterHistory } from '../../typeDefinition';

type Props = {
	dispatch?: Function,
	history?: RouterHistory,
};

@connect(({ app }) => {
	return {

	};
})

class DocNavigator extends Component {
	props: Props;

	render() {
		const configs = siteConfigs.docs || {},
			menuItems = configs.menuItems || [];

		return <ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}>
			{menuItems.map((menu) => {
				return <MenuItem key={menu.url} {...menu} onNavigate={this.onNavigate}/>;
			})}
		</ScrollView>;
	}

	onNavigate = (group, id) => {
		animateScrollTo(0, { element: window });
		group && id && this.props.history.push(`/docs/${group}/${id}`);
	};
}

export default withRouter(DocNavigator);

const styles = StyleSheet.create({
	wrapperStyle: {
		flex: 1,
	},
	container: {
		zIndex: 20,
		position: 'fixed', top: sizes.navigationHeight, left: 0, bottom: 0,
		width: sizes.sideBarWidth,
	},
	contentContainer: {
		padding: 20, paddingRight: 0,
	},
});
