import tinyColorImport from 'tinycolor2';

export const tinyColor = tinyColorImport;

const main = '#de4f4f';
const secondary = '#4A90E2';

export const colors = {
	main, secondary, lighten, darken,
};

export const sizes = {
	navigationHeight: 60,
	sideBarWidth: 256,
	smallScreen: 1024,
	maxContentWidth: 1280,
};

function darken(base = '#ffffff', amount = 5) {
	return tinyColor(base).darken(amount).toHexString();
}

function lighten(base = '#ffffff', amount = 5) {
	return tinyColor(base).lighten(amount).toHexString();
}