import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ContextProvider, Button } from 'react-universal-ui';
import Icon from '../components/vector-icons/MaterialIcons';

type Props = {
	counter?: string,
	dispatch?: Function,
};

@connect(({ app }) => {
	return {
		counter: app.counter,
	};
})

export class CoreExample extends Component {
	props: Props;

	render() {
		const beerIcon = <Icon
			name="whatshot"
			style={styles.buttonIcon}/>;

		return <View style={styles.container}>
			<Text style={styles.welcome}>
				Welcome to{'\n'}
				React Universal! <Icon name="lightbulb-outline" size={20}/>
			</Text>
			<Text style={styles.instructions}>
				Source code for this example is in{'\n'}
				the left-side document.
			</Text>
			<Text style={styles.instructions}>
				Nope, you cannot shake for dev-menu,{'\n'}
				because we are in Browser!
			</Text>
			<Button
				wrapperStyle={styles.buttonWrapper}
				title={`Click me! ${this.props.counter}`}
				icon={beerIcon}/>
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10, marginBottom: 30,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 10,
	},
	counterButton: {
		backgroundColor: '#de4f4f',
		width: 120, marginTop: 10,
	},
	buttonWrapper: {
		backgroundColor: '#de4f4f',
		width: 120,
		marginTop: 20,
	},
	buttonIcon: {
		fontSize: 28,
		color: '#ffffff',
	},
});