import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import Layout from '../../components/layout';
import TransformableZone from './transformableZone';
import Transformable from './transformable';

type Props = {

};

export default class TutorialScene extends Component {
	props: Props;

	render() {
		return <Layout style={styles.container}>
			<TransformableZone
				style={{
					position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden',
					backgroundColor: '#000000', }}>
				<Transformable
					style={{ borderRadius: 3, width: 100, height: 50 }}>
					{({ dragging, focus, top, left }) => {
						return <Text>
							{focus ? 'TRUE' : 'FALSE'}{'\n'}
							{top}:{left}
						</Text>;
					}}
				</Transformable>
			</TransformableZone>
		</Layout>;
	}
}

const styles = StyleSheet.create({
	container: {

	},
});