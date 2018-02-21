import { utils } from 'react-universal-ui';
import { StaticRouter } from 'react-router';
import { BrowserRouter, withRouter as withDomRouter } from 'react-router-dom';
import { NativeRouter, withRouter as withNativeRouter } from 'react-router-native';

export const withRouter = utils.isWeb ? withDomRouter : withNativeRouter;

export function getRouterAndProps(props) {
	if (utils.isServer) {
		return {
			component: StaticRouter,
			props: {
				location: props.ssrLocation,
				context: props.ssrContext,
			},
		};
	} else if (utils.isWeb) {
		return {
			component: BrowserRouter,
			props: {},
		};
	} else {
		return {
			component: NativeRouter,
			props: {},
		};
	}
}