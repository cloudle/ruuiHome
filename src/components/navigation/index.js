import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect, Button } from 'react-universal-ui';
import { push } from 'react-router-redux';

import EntypoIcon from '../vector-icons/Entypo';
import GithubIcon from './githubIcon';
import NavigationItem from './navigationItem';
import { sizes, colors } from '../../utils';
import { Style } from '../../typeDefinition';

type Props = {
	dispatch?: Function,
	style?: Style,
};

@connect(({ app }) => {
	return {

	};
})

export default class NavigationBar extends Component {
	props: Props;

	render() {
		return <View style={[styles.container, this.props.style]}>
			{this.renderLogo()}
			{this.renderNavigation()}
		</View>;
	}

	renderLogo = () => {
		return <TouchableOpacity
			style={styles.logoContainer}
			onPress={() => { this.props.dispatch(push('/')); }}>
			<EntypoIcon name="circular-graph" style={styles.ruuiIcon}/>
			<Text style={styles.repoNameText}>UNIVERSAL UI</Text>
		</TouchableOpacity>;
	};

	renderNavigation = () => {
		return <View style={styles.navigationContainer}>
			{menuItems.map((route, i) => {
				return <NavigationItem
					key={i} route={route}
					onPress={this.onNavigate}/>;
			})}
			<TouchableOpacity
				style={styles.githubIconContainer}
				onPress={() => { window.open('https://github.com/cloudle/ruui'); }}>
				<GithubIcon/>
			</TouchableOpacity>
		</View>;
	};

	onNavigate = (route) => {
		this.props.dispatch(push(route.uri));
	};
}

const edgeSpacing = 20,
	menuItems = [{
		title: 'VIDEO TUTORIALS',
		uri: '/tutorials',
	}, {
		title: 'DOCS',
		uri: '/docs',
	}, {
		title: 'MEETUPS',
		uri: '/meetups',
	}];

const styles = StyleSheet.create({
	container: {
		position: 'fixed', zIndex: 100,
		top: 0, left: 0, right: 0,
		flexDirection: 'row',
		height: sizes.navigationHeight,
		backgroundColor: '#2b2e39',
	},
	logoContainer: {
		flexDirection: 'row', alignItems: 'center',
		paddingHorizontal: edgeSpacing,
	},
	ruuiIcon: {
		fontSize: 26, color: '#ffffff',
		marginRight: 12,
	},
	repoNameText: {
		fontSize: 14, fontWeight: '500',
		color: '#ffffff',
	},
	navigationContainer: {
		flex: 1, flexDirection: 'row',
		justifyContent: 'flex-end', alignItems: 'center',
		marginRight: edgeSpacing,
	},
	githubIconContainer: {
		marginLeft: edgeSpacing,
	},
});