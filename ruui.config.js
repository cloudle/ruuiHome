const env = process.env.ENV || 'development',
	isProduction = env === 'production';

module.exports = {
	publicPath: isProduction ? '/' : 'http://localhost:3000/',
	autoCache: true,
	keepPreviousBuild: false,
	excludeCaches: [
		'body-parser', 'cookie-parser', 'cors',
		'react-universal-ui',
	],
	webpack: (configs, webpack) => {
		configs.module.rules.push({
			test: /\.md/,
			loader: 'raw-loader',
		});

		return configs;
	},
	ejsTemplate: {
		preHeading: `
			<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700" rel="stylesheet">
			<link rel="stylesheet" type="text/css" href="/animate.min.css">

			<style>
				:focus { outline: none; }
				body {
					font-family: "Open Sans", sans-serif;
					-webkit-font-smoothing: antialiased;
					font-size: 14px;
					color: #1f2128;
					font-weight: 400;
				}
				#root {
					position: absolute;
					top: 0; right: 0; bottom: 0; left: 0;
					display: flex;
				}
				.touchable {
					cursor: pointer;
					user-select: none;
				}
				a {
					text-decoration: none;
				}
				.scroll-view {
					-ms-overflow-style: none;
				}
				.scroll-view::-webkit-scrollbar {
					display: none;
				}
		
				.page-section-title:after {
					content: ''; display: block;
					width: 100px; height: 4px; border-radius: 2px;
					background-color: #de4f4f;
					margin: 10px auto 0;
				}
		
				.page-section-title.dark:after {
					background-color: #ffffff;
				}
		
				.navigation-item:hover .title {
					color: #de4f4f;
				}
		
				.chapter-player-row:before {
					content: ' '; display: block; box-sizing: border-box;
					position: absolute; left: -37px; top: 9px;
					background-color: #ffffff;
					width: 12px; height: 12px;
					border-radius: 50%;
					border: solid 2px rgba(0, 0, 0, 0.3);
				}
		
				.chapter-player-row:hover:before {
					border-color: #de4f4f;
				}
		
				.chapter-player-row:hover .heading-text {
					color: #de4f4f;
				}
		
				.doc-menu-item:hover .title {
					color: #de4f4f;
				}
		
				.noselect {
					-webkit-touch-callout: none; /* iOS Safari */
					-webkit-user-select: none; /* Safari */
					-khtml-user-select: none; /* Konqueror HTML */
					-moz-user-select: none; /* Firefox */
					-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none; /* Non-prefixed version, currently
																			supported by Chrome and Opera */
				}
		
				.universal-code-container {
					text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004) !important;
					text-rendering: optimizeLegibility !important;
					-webkit-font-smoothing: antialiased !important;
					-webkit-text-stroke: 0.45px rgba(0, 0, 0, 0.1);
				}
		
				.token.tab:not(:empty),
				.token.cr,
				.token.lf,
				.token.space {
					position: relative;
				}
		
				.token.tab:not(:empty):before,
				.token.cr:before,
				.token.lf:before,
				.token.space:before {
					position: absolute; color: rgba(0, 0, 0, 0.05); z-index: -1;
				}
		
				.token.tab:not(:empty):before {
					content: '\\21E5'; color: rgba(0, 0, 0, 0.05);
				}
		
				.token.space:before {
					content: '\\00B7'; color: rgba(0, 0, 0, 0.05);
				}
		
				@font-face {
					font-family: Material Icons;
					src: url('/MaterialIcons.ttf') format('truetype');
				}
		
				@font-face {
					font-family: Ionicons;
					src: url('/Ionicons.ttf') format('truetype');
				}
		
				/* Tablet responsive styles ------------------------- */
				@media screen and (max-width: 1024px) {
					.docs-container {
						margin-right: 0 !important;
					}
					.docs-emulator-pane {
						display: none !important;
					}
					.navigation-bar {
						margin-right: 0 !important;
					}
				}	
			</style>
		`,
		noDefaultStyles: true,
		postContent: `
			<script src="/wow.min.js"></script>
		`,
	},
};
