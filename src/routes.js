import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect, Modal, Dropdown, Snackbar } from 'react-universal-ui';
import { renderRoutes } from 'react-router-config';

import HomeScene from './scenes/home';
import DocumentScene from './scenes/docs';
import MeetupScene from './scenes/meetups';
import TutorialScene from './scenes/tutorials';
import NotFoundScene from './scenes/notFound';
import * as appActions from './store/action/app';
import type { Route } from './typeDefinition';

type Props = {
	route: Route,
};

@connect(({ app }) => {
	return {

	};
})

class RootContainer extends Component {
	props: Props;

	// componentDidMount() {
	// 	this.onPageScroll();
	// 	window.addEventListener('scroll', this.onPageScroll);
	// }
	//
	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.onPageScroll);
	// }

	render() {
		return <View style={styles.container}>
			{renderRoutes(this.props.route.routes)}

			<Modal/>
			<Dropdown/>
			<Snackbar/>
		</View>;
	}

	// onPageScroll = () => {
	// 	const supportPageOffset = window.pageXOffset !== undefined,
	// 		isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat'),
	// 		scroll = {
	// 			x: supportPageOffset ? window.pageXOffset : (isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft),
	// 			y: supportPageOffset ? window.pageYOffset : (isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop),
	// 		};
	//
	// 	this.props.dispatch(appActions.setPageScrollOffset(scroll));
	// };
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default [{
	component: RootContainer,
	routes: [{
		path: '/',
		exact: true,
		component: HomeScene,
	}, {
		path: '/docs/:group/:id',
		exact: true,
		component: DocumentScene,
	}, {
		path: '/docs',
		exact: true,
		component: DocumentScene,
	}, {
		path: '/tutorials',
		component: TutorialScene,
	}, {
		path: '/meetups',
		component: MeetupScene,
	}, {
		component: NotFoundScene,
	}],
}];