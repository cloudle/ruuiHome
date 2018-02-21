import React from 'react';
import { Animated, Easing } from 'react-native';

export function animated({
													 speed = 500, delay = 0, fromValue = 0, toValue = 1,
													 easing = Easing.out(Easing.cubic),
												 } = {}) {
	return function (BaseComponent) {
		const displayName = `AnimatedEnhancer(${BaseComponent.name})`;

		return class AnimatedEnhancer extends BaseComponent {
			static displayName = displayName;

			constructor(props) {
				super(props);
				this.animation = new Animated.Value(toValue);
			}

			componentDidMount() {
				this.animation.setValue(fromValue);
				this.animationTimeout = setTimeout(() => {
					Animated.timing(this.animation, {
						toValue, easing,
						duration: speed,
					}).start(() => {
						if (super.animationDidFinish) super.animationDidFinish();
					});
				}, delay);

				if (super.componentDidMount) super.componentDidMount();
			}

			componentWillUnmount() {
				if (this.animationTimeout) clearTimeout(this.animationTimeout);
				if (super.componentWillUnmount) super.componentWillUnmount();
			}
		};
	};
}
