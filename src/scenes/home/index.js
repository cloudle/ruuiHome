import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { connect, Button } from 'react-universal-ui';

import Layout from '../../components/layout';
import particleJs from '../../components/particle';
import { sizes, colors } from '../../utils';

type Props = {
	dispatch?: Function,
};

@connect(({ app }) => {
	return {
		counter: app.counter,
	};
})

export default class HomeScene extends Component {
	props: Props;

	componentDidMount() {
		setTimeout(() => particleJs('particle-header', require('./particles-light.json')), 1000);
	}

	render() {
		return <Layout home style={styles.container}>
			<View id="particle-header" style={styles.headingContainer}>
				<View style={styles.headingInnerContainer}>
					<Text style={styles.headingText}>WRITE UI ONCE (JAVASCRIPT)</Text>
					<Text style={styles.largeHeadingText}>RUN EVERYWHERE!</Text>
					<Text style={styles.smallHeadingText}>
						on Web, Node (server side rendering), Native Mobile, Windows Universal, Mac, Linux..
					</Text>
					<View style={styles.commandsContainer}>
						<Button wrapperStyle={styles.buttonWrapper} innerStyle={styles.buttonInner}>
							<Text style={styles.buttonText}>INSTALL</Text>
							<Text style={styles.buttonSmallText}>Version 0.1.71</Text>
						</Button>
						<Button
							wrapperStyle={styles.transparentButtonWrapper}
							innerStyle={styles.buttonInner}
							textStyle={styles.buttonText}
							title="TUTORIAL"/>
					</View>
				</View>
			</View>
		</Layout>;
	}
}

const headingTextStyles = {
	color: '#ffffff', fontWeight: '200', textAlign: 'center',
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headingContainer: {
		height: 600, alignItems: 'center', justifyContent: 'flex-end',
		backgroundImage: `url(${require('./nebula.jpg')})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	},
	headingInnerContainer: {
		position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
		alignItems: 'center', justifyContent: 'center',
	},
	headingText: {
		...headingTextStyles, fontSize: 22,
	},
	smallHeadingText: {
		...headingTextStyles, fontSize: 14, color: '#b9c0d6',
		lineHeight: 22, maxWidth: 320,
	},
	largeHeadingText: {
		...headingTextStyles,
		fontSize: 36, fontWeight: '700',
		marginTop: 10, marginBottom: 15,
	},
	commandsContainer: {
		flexDirection: 'row',
		marginTop: 32,
	},
	buttonWrapper: {
		backgroundColor: colors.main, borderRadius: 2,
		width: 180, marginHorizontal: 8,
	},
	buttonInner: {
		height: 45,
	},
	buttonText: {
		fontSize: 12, color: '#ffffff', fontWeight: '500',
		textAlign: 'center',
	},
	buttonSmallText: {
		fontSize: 10, color: '#ffffff',
		textAlign: 'center', marginTop: 3,
	},
	transparentButtonWrapper: {
		backgroundColor: 'transparent',
		borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 2,
		width: 180, marginHorizontal: 8,
	},
});