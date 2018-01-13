import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import Layout from '../../components/layout';

type Props = {

};

export default class TutorialScene extends Component {
	props: Props;

	render() {
		return <Layout style={styles.container}>
			<Text>TutorialScene</Text>
		</Layout>;
	}
}

const styles = StyleSheet.create({
	container: {

	},
});