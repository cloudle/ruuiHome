import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import PageSection from '../pageSection';
import Interpolate from '../interpolate';
import { siteConfigs, baseStyles } from '../../utils';
import { Style } from '../../typeDefinition';

type Props = {
	wrapperStyle?: Style,
	innerStyle?: Style,
	fullSize?: Boolean,
};

export default class Footer extends Component {
	props: Props;

	render() {
		const footers = siteConfigs.footer || {};

		return <PageSection
			fullSize={this.props.fullSize}
			wrapperStyle={[styles.container, this.props.wrapperStyle]}
			innerStyle={[styles.innerContainer, this.props.innerStyle]}>
			<Interpolate
				style={{ flex: 1, marginBottom: 4, minWidth: 450 }}
				textStyle={styles.textStyle}
				template={footers.copyright} sources={footers}/>
			<Interpolate
				textStyle={styles.textStyle}
				template={footers.license} sources={footers}/>
		</PageSection>;
	}
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		backgroundImage: "url('/img/bg-footer.svg')",
		backgroundSize: '100%',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	},
	innerContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: 12,
	},
	licenseContainer: {
		flex: 1, alignItems: 'flex-end',
	},
	textStyle: {
		color: '#1f2128', fontWeight: '200',
	},
});
