import React from 'react';
import { Svg, Path, G, Circle, Polygon, } from 'svgs';

type Props = {
	size?: Number,
	triangleScale?: Number,
	color?: String,
	opacity?: Number,
	strokeWidth?: Number,
};

export const VideoPlayIcon = (props: Props) => {
	const size = props.size, triangleScale = props.triangleScale * 0.8,
		innerSize = props.size - props.strokeWidth,
		innerRadius = (size - props.strokeWidth) / 2,
		pointOne = `${innerSize * triangleScale} ${innerSize * 0.5}`, // left
		pointTwo = `${innerSize * (1 - (triangleScale * 0.85))} ${innerSize * triangleScale}`, // bottom
		pointTree = `${innerSize * (1 - (triangleScale * 0.85))} ${innerSize * (1 - triangleScale)}`, // top
		trianglePoints = `${pointOne} ${pointTwo} ${pointTree}`,
		translate = props.strokeWidth / 2,
		circleTransform = `translate(${translate}, ${translate})`;

	return <Svg
		style={{ width: size, height: size }}
		stroke="none" fill="black"
		width={`${size}px`} height={`${size}px`}
		viewBox={`0 0 ${size} ${size}`}>
		<G stroke="none" fill="none" opacity={props.opacity} transform={circleTransform}>
			<Circle
				stroke={props.color} strokeWidth={props.strokeWidth}
				cx={innerRadius} cy={innerRadius} r={innerRadius}/>
			<Polygon id="Triangle" fill={props.color} points={trianglePoints}/>
		</G>
	</Svg>;
};

VideoPlayIcon.defaultProps = {
	size: 37,
	triangleScale: 1,
	color: '#000000',
	opacity: 0.35,
	strokeWidth: 2,
};

