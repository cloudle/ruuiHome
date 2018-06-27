import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, } from 'react-native';

import PageSection from './pageSection';
import PlayerCommand from './seriesPlayerCommand';
import { VideoPlayIcon } from './svgs';
import { baseStyles, colors } from '../utils';
import { Style, Element } from '../typeDefinition';

type Props = {
	wrapperStyle?: Style,
	innerStyle?: Style,
	configs?: {
		dark?: Boolean,
		title?: String,
		series?: Array<Object>,
	},
};

export default class SeriesSection extends Component {
	props: Props;

	render() {
		const configs = this.props.configs || {},
			textBrightness = this.props.configs.dark ? 255 : 0,
			lightColor = `rgba(${textBrightness}, ${textBrightness}, ${textBrightness}, 0.3)`,
			highlightColor = `rgba(${textBrightness}, ${textBrightness}, ${textBrightness}, 0.8)`,
			dynamicStyles = {
				lightColor, highlightColor,
				videoIconColor: this.props.configs.dark ? '#ffffff' : '#000000',
				backgroundColor: this.props.configs.dark ? '#222736' : '#ffffff',
			};

		return <PageSection
			dark={configs.dark} title={configs.title}
			wrapperStyle={[styles.container, this.props.wrapperStyle]}
			innerStyle={[styles.innerContainer, this.props.innerStyle]}>
			{configs.series.map((seri, i) => {
				return <View key={i} style={{ flexDirection: 'row', }}>
					{this.renderSeriesSummary(seri, dynamicStyles)}
					{this.renderSeriesDetails(seri, dynamicStyles)}
				</View>;
			})}
		</PageSection>;
	}

	renderSeriesSummary = (seri, dynamicStyles) => {
		const chapters = seri.chapters || [],
			totalTime = chapters.reduce((acc, next) => acc + next.length, 0);

		return <View style={styles.summaryContainer}>
			<View style={styles.summaryInnerContainer}>
				{seri.title && <Text
					style={[styles.headingText, { color: dynamicStyles.lightColor }]}>{seri.title}</Text>}
				{seri.length && <View style={styles.lengthRowContainer}>
					<VideoPlayIcon
						size={18} color={dynamicStyles.videoIconColor}
						strokeWidth={1} triangleScale={0.9}/>
					<Text style={[styles.timeText, {
						color: dynamicStyles.lightColor, }]}>{totalTime} MIN TOTAL</Text>
				</View>}
				{seri.description && <Text style={[styles.descriptionText, {
					color: dynamicStyles.lightColor, }]}>{seri.description}</Text>}
			</View>
		</View>;
	};

	renderSeriesDetails = (seri, dynamicStyles) => {
		const chapters = seri.chapters || [];

		return <View style={[styles.detailContainer, { borderColor: dynamicStyles.lightColor, }]}>
			<View style={styles.detailInnerContainer}>
				{chapters.map((chapter, i) => {
					return <PlayerCommand
						key={i} title={chapter.title} length={chapter.length}
						headingTextStyle={styles.playerCommandHeading}
						timeTextStyle={styles.timeText}
						lightColor={dynamicStyles.lightColor}
						highlightColor={dynamicStyles.highlightColor}
						backgroundColor={dynamicStyles.backgroundColor}/>;
				})}
			</View>
		</View>;
	};
}

const baseTextStyle = {
	...baseStyles.text, color: 'rgba(0, 0, 0, 0.32)', textAlign: 'right', };

const styles = StyleSheet.create({
	container: {
		paddingBottom: 0,
	},
	innerContainer: {
		paddingTop: 28,
	},
	summaryContainer: {
		flex: 1, alignItems: 'flex-end',
		paddingBottom: 42,
	},
	summaryInnerContainer: {
		maxWidth: 360, paddingRight: 30, marginTop: -12,
	},
	detailContainer: {
		flex: 1, paddingBottom: 42, minHeight: 200,
		borderLeftWidth: 2, borderColor: 'rgba(0, 0, 0, 0.3)',
	},
	detailInnerContainer: {
		marginTop: -12,
		alignItems: 'flex-start',
	},
	lengthRowContainer: {
		flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
		marginBottom: 15,
	},
	headingText: {
		...baseTextStyle, fontSize: 20, fontWeight: '600',
		marginBottom: 12,
	},
	timeText: {
		...baseTextStyle, fontSize: 15, fontWeight: '600',
		marginLeft: 6,
	},
	descriptionText: {
		...baseTextStyle, fontSize: 16,
	},
	playerCommandHeading: {
		...baseTextStyle, fontSize: 18, color: 'rgba(0, 0, 0, 0.8)',
		marginRight: 12,
	}
});
