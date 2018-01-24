import React, { Component } from 'react';
import { utils } from 'react-universal-ui';
import { isEmpty, isFunction, isEqual } from 'lodash';

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
				this.state = { initialProps: loadInitialProps(props), };
			}

			componentWillMount() {
				this.fetchInitialProps();
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
						initialProps.then(response => this.setState({ initialProps: response }));
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

function loadInitialProps(props) {
	const result = props.staticContext || global.ssrInitialProps || {};
	delete global.ssrInitialProps;

	return result;
}