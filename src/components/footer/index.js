import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import PageSection from '../pageSection';
import Interpolate from '../interpolate';
import { siteConfigs, baseStyles } from '../../utils';

type Props = {

};

export default class Footer extends Component {
	props: Props;

	render() {
		const footers = siteConfigs.footer || {};

		return <PageSection wrapperStyle={styles.container} innerStyle={styles.innerContainer}>
			<Interpolate
				template={footers.copyright} sources={footers}/>
			<Interpolate
				template={footers.license} sources={footers}
				style={{ flex: 1, justifyContent: 'flex-end', }}/>
		</PageSection>;
	}
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		backgroundImage: "url('img/bg-footer.svg')",
		backgroundSize: '100%',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	},
	innerContainer: {
		flexDirection: 'row',
	},
	licenseContainer: {
		flex: 1, alignItems: 'flex-end',
	},
});