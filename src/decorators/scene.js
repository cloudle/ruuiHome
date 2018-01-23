import React, { Component } from 'react';
import { isEmpty, isFunction } from 'lodash';

type UniversalSceneProps = {
	match?: Object,
};

export function universalScene({ getInitialProps, } = {}) {
	return function (BaseComponent) {
		return class UniversalScene extends Component {
			props: UniversalSceneProps;
			static getInitialProps = getInitialProps;

			constructor(props) {
				super(props);

				const initialProps = loadInitialProps(props);
				this.state = { initialProps, };

				if (isEmpty(initialProps) && isFunction(getInitialProps)) {
					getInitialProps(props.match).then((response) => {
						this.setState({ initialProps: response });
					});
				}
			}

			render() {
				return <BaseComponent
					{...this.props}
					{...this.state.initialProps}/>;
			}
		};
	};
}

function loadInitialProps(props) {
	const result = props.staticContext || global.ssrInitialProps || {};
	delete global.ssrInitialProps;

	return result;
}