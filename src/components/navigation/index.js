import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-universal-ui';

import EntypoIcon from '../vector-icons/Entypo';
import GithubIcon from './githubIcon';
import NavigationItem from './navigationItem';
import { sizes, colors } from '../../utils';

export default class NavigationBar extends Component {
	render() {
		return <View style={styles.container}>
			{this.renderLogo()}
			{this.renderNavigation()}
		</View>;
	}

	renderLogo = () => {
		return <View style={styles.logoContainer}>
			<EntypoIcon name="circular-graph" style={styles.ruuiIcon}/>
			<Text style={styles.repoNameText}>UNIVERSAL UI</Text>
		</View>;
	};

	renderNavigation = () => {
		return <View style={styles.navigationContainer}>
			{menuItems.map((item, i) => {
				return <NavigationItem key={i} title={item.title}/>;
			})}
			<TouchableOpacity style={styles.githubIconContainer}>
				{/*<EntypoIcon name="github" style={styles.githubIcon}/>*/}
				<GithubIcon/>
			</TouchableOpacity>
		</View>;
	};
}

const edgeSpacing = 20,
	menuItems = [{
		title: 'VIDEO TUTORIALS',
	}, {
		title: 'DOCS',
	}, {
		title: 'MEETUPS',
	}];

const styles = StyleSheet.create({
	container: {
		position: 'absolute', zIndex: 100,
		top: 0, left: 0, right: 0,
		flexDirection: 'row',
		height: sizes.navigationHeight,
		// backgroundColor: '#2b2e39',
	},
	logoContainer: {
		flexDirection: 'row', alignItems: 'center',
		marginLeft: edgeSpacing,
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