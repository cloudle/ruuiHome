import React, { Component } from 'react';
import { utils } from 'react-universal-ui';
import { isEmpty, isFunction, isEqual } from 'lodash';

type UniversalSceneProps = {
	match?: Object,
};

export function universalScene({ getInitialProps, } = {}) {
	return function (BaseComponent) {
		const displayName = `UniversalScene(${BaseComponent.name})`;

		return class UniversalScene extends Component {
			props: UniversalSceneProps;
			static displayName = displayName;
			static getInitialProps = getInitialProps;

			constructor(props) {
				super(props);
				this.state = { initialProps: loadInitialProps(props, displayName), };
			}

			componentWillMount() {
				if (isEmpty(this.state.initialProps)) this.fetchInitialProps();
			}

			componentWillReceiveProps(nextProps) {
				if (!isEqual(nextProps.match, this.props.match)) {
					this.fetchInitialProps(nextProps);
				}
			}

			fetchInitialProps = (nextProps) => {
				const props = nextProps || this.props;

				if (!utils.isServer && isFunction(getInitialProps)) {
					const initialProps = getInitialProps(props.match, false, {}) || {};

					if (initialProps.then) {
						initialProps.then((response) => {
							this.setState({ initialProps: response });
						});
					} else this.setState({ initialProps });
				}
			};

			render() {
				return <BaseComponent
					{...this.props}
					initialProps={this.state.initialProps}/>;
			}
		};
	};
}

function loadInitialProps(props, displayName) {
	if (utils.isServer) {
		return props.staticContext[displayName];
	} else {
		const result = global.ssrInitialProps[displayName] || {};
		if (global.ssrInitialProps[displayName]) delete global.ssrInitialProps[displayName];
		return result;
	}
}