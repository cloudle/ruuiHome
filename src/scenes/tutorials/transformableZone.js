import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import Transformable from './transformable';
import type { Element, Style } from '../../typeDefinition';

type Props = {
	style?: Style,
	children?: Element,
};

export default class TransformableZone extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {
			children: [{}, {}],
		};
	}

	render() {
		return <View style={this.props.style}>
			{this.state.children.map((child, i) => {
				return <Transformable key={i} initialState={{ width: 100, height: 100, }}>
					{({ width, height }) => {
						return <View style={{ width, height, backgroundColor: '#ffffff', }}>
							<Text>Hey!</Text>
						</View>;
					}}
				</Transformable>;
			})}
		</View>;
	}
}

const styles = StyleSheet.create({

});
