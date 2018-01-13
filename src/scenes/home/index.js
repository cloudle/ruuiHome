import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { connect, Button, } from 'react-universal-ui';

import Layout from '../../components/layout';
import PageSection from '../../components/pageSection';
import ColumnSection from '../../components/columnSection';
import particleJs from '../../components/particle';
import { sizes, colors, siteConfigs, baseStyles } from '../../utils';

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
		particleJs('particle-header', require('./particles-light.json'));
	}

	render() {
		const homeConfigs = siteConfigs.home,
			headings = homeConfigs.heading;

		return <Layout home style={styles.container}>
			<View id="particle-header" style={styles.headingContainer}>
				<View style={styles.headingInnerContainer}>
					<Text className="wow bounceInDown" style={styles.headingText}>{headings.heading}</Text>
					<Text className="wow fadeInDown" style={styles.largeHeadingText}>{headings.largeHeading}</Text>
					<Text className="wow fadeIn" style={styles.smallHeadingText}>{headings.description}</Text>
					<View className="wow fadeInUp" style={styles.commandsContainer}>
						<Button wrapperStyle={styles.buttonWrapper} innerStyle={styles.buttonInner}>
							<Text style={styles.buttonText}>{headings.install}</Text>
							<Text style={styles.buttonSmallText}>
								{headings.version} {siteConfigs.ruuiVersion}
							</Text>
						</Button>
						<Button
							wrapperStyle={styles.transparentButtonWrapper}
							innerStyle={styles.buttonInner}
							textStyle={styles.buttonText}
							title={headings.tutorial}/>
					</View>
				</View>
			</View>

			<ColumnSection
				wrapperStyle={{ borderTopWidth: 0, }}
				configs={homeConfigs.whySection}/>

			<ColumnSection
				wrapperStyle={styles.darkSectionWrapper}
				configs={{ dark: true, title: 'DARK SECTION' }}/>

			<ColumnSection
				wrapperStyle={styles.redSectionWrapper}
				configs={{ dark: true, title: 'DARK SECTION' }}/>
		</Layout>;
	}
}

const headingTextStyles = {
		...baseStyles.text,	color: '#ffffff', fontWeight: '200', textAlign: 'center',
	},
	buttonWidth = 150,
	buttonRadius = 3;

const styles = StyleSheet.create({
	container: {

	},
	headingContainer: {
		height: 650, alignItems: 'center', justifyContent: 'flex-end',
		backgroundImage: "url('img/7935.jpg')",
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
		...headingTextStyles, fontSize: 48, fontWeight: '700',
		marginTop: 10, marginBottom: 15,
	},
	commandsContainer: {
		flexDirection: 'row',
		marginTop: 50,
	},
	buttonWrapper: {
		backgroundColor: colors.main,
		width: buttonWidth, marginHorizontal: 8,
		borderRadius: buttonRadius,
	},
	buttonInner: {
		height: 45,
	},
	buttonText: {
		...baseStyles.text, textAlign: 'center',
		fontSize: 12, color: '#ffffff', fontWeight: '500',
	},
	buttonSmallText: {
		...baseStyles.text, fontSize: 10, color: '#ffffff',
		textAlign: 'center', marginTop: 3,
	},
	transparentButtonWrapper: {
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 2,
		width: buttonWidth, marginHorizontal: 8,
	},
	darkSectionWrapper: {
		backgroundColor: '#222736',
		backgroundImage: "url('img/bg-gallary.svg')",
		backgroundSize: '70%',
		backgroundPosition: 'top center',
		backgroundRepeat: 'no-repeat',
		height: 400,
	},
	redSectionWrapper: {
		backgroundColor: '#e04e4b',
		backgroundImage: "url('img/bg-earth.png')",
		backgroundSize: 'contain',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		height: 400, marginTop: 200,
	}
});