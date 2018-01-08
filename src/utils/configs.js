import tinyColorImport from 'tinycolor2';
import siteConfigsImport from './site.json';

export const tinyColor = tinyColorImport;
export const siteConfigs = siteConfigsImport;

const main = '#de4f4f';
const secondary = '#4A90E2';
const lineBreak = '#d5d8df';

export const colors = {
	main, secondary, lighten, darken,
	lineBreak,
};

export const sizes = {
	navigationHeight: 60,
	sideBarWidth: 256,
	smallScreen: 1024,
	maxContentWidth: 940,
};

function darken(base = '#ffffff', amount = 5) {
	return tinyColor(base).darken(amount).toHexString();
}

function lighten(base = '#ffffff', amount = 5) {
	return tinyColor(base).lighten(amount).toHexString();
}