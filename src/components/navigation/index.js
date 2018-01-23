import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect, Button } from 'react-universal-ui';
import { push } from 'react-router-redux';

import EntypoIcon from '../vector-icons/Entypo';
import { GithubIcon, } from '../svgs';
import NavigationItem from './navigationItem';
import { sizes, colors, siteConfigs, iStyles, baseStyles } from '../../utils';
import { Style } from '../../typeDefinition';

type Props = {
	dispatch?: Function,
	style?: Style,
	home?: Boolean,
	logoWidth?: Number,
	pageScrollOffset?: {
		x: Number,
		y: Number,
	},
};

@connect(({ app }) => {
	return {
		pageScrollOffset: app.pageScrollOffset,
	};
})

export default class NavigationBar extends Component {
	props: Props;

	render() {
		const transparent = this.props.home && this.props.pageScrollOffset.y <= 10,
			containerStyle = transparent ? { backgroundColor: 'transparent', } : {};

		return <View style={[styles.container, containerStyle, this.props.style]}>
			{this.renderLogo(transparent)}
			{this.renderNavigation()}
		</View>;
	}

	renderLogo = (transparent) => {
		const transparentStyle = transparent ? {} : { backgroundColor: colors.main, },
			widthStyle = this.props.logoWidth ? { width: this.props.logoWidth } : {};

		return <TouchableOpacity
			style={[styles.logoContainer, transparentStyle, widthStyle]}
			onPress={() => { this.props.dispatch(push('/')); }}>
			<EntypoIcon name="circular-graph" style={styles.ruuiIcon}/>
			<Text style={styles.repoNameText}>{siteConfigs.siteName}</Text>
		</TouchableOpacity>;
	};

	renderNavigation = () => {
		const menuItems = siteConfigs.menus || [];

		return <View style={styles.navigationContainer}>
			{menuItems.map((route, i) => {
				return <NavigationItem
					key={i} route={route}
					onPress={this.onNavigate}/>;
			})}
			<TouchableOpacity
				style={styles.githubIconContainer}
				onPress={() => { window.open(siteConfigs.repoUrl); }}>
				<GithubIcon/>
			</TouchableOpacity>
		</View>;
	};

	onNavigate = (route) => {
		this.props.dispatch(push(route.uri));
	};
}

const edgeSpacing = 20;

const styles = StyleSheet.create({
	container: {
		position: 'fixed', zIndex: 100,
		top: 0, left: 0, right: 0,
		flexDirection: 'row',
		height: sizes.navigationHeight,
		backgroundColor: '#202434',
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
		...baseStyles.text, fontSize: 18, fontWeight: '700', color: '#ffffff',
		letterSpacing: -1,
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