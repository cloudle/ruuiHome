import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Path, Text } from 'svgs';

type Props = {

};

export default class RuuiIcon extends Component {
	props: Props;

	render() {
		return <Svg height="50px" width="50px" viewbox="0 0 50 50" preserveAspectRatio="meet">
			<Text fontSize="16px">Hey there!</Text>
			<Text fontSize="16px">Hey there!</Text>
		</Svg>;
	}
}