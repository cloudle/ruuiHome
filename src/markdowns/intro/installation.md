# Installation

In order to get React Universal UI installed in your Applications. What you have to do is create a [React Native App](https://facebook.github.io/react-native/) and install RUUI by npm (or yarn).

### System requirement

* Globally install [Node](https://nodejs.org/en/)
* Globally install [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/)

## npm

[x] Task a
[x] Task b
[x] Task c
[o] Task d

Inside your `React Native` Project, open terminal and run  

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import { utils } from 'react-universal-ui';
import { AutoSizer, List } from 'react-virtualized';

import { createStyleObject } from './create-element';

const defaultBaseStyle = {
	fontFamily: "Fira Code, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
	color: '#ffffff', fontWeight: '500',
};

type Props = {
	rows?: Array<Object>,
	baseStyle?: Object,
	stylesheet?: Object,
	useInlineStyles?: Boolean,
};

export default function universalCodeRenderer(baseStyle = defaultBaseStyle) {
	const containerElement = utils.isWeb ? 'div' : View;

	return ({ rows, stylesheet, useInlineStyles }: Props) => {
		const virtualizedList = <AutoSizer>
			{({ width, height }) => {
				return <List
					height={height}
					width={width}
					rowHeight={20}
					rowCount={rows.length}
					rowRenderer={rowRenderer.bind(null,
						{ rows, baseStyle, stylesheet, useInlineStyles })}
					overscanRowCount={5}/>;
			}}
		</AutoSizer>;

		return React.createElement(containerElement, {
			className: 'universal-code-container',
			style: { height: '300px' },
		}, virtualizedList);
	};
}

type UniversalCodeRowProps = {
	node?: {
		properties?: Array<Object>,
		type?: String,
		tagName?: String,
		value?: String,
		children?: Array<Object>,
	},
	stylesheet?: Object,
	useInlineStyles?: Boolean,
};

function UniversalCodeRow({ node, baseStyle, stylesheet, useInlineStyles }: UniversalCodeRowProps) {
	const textElement = utils.isWeb ? 'span' : Text,
		{ properties, type, tagName, value } = node,
		classes = ((properties && properties.className) || []) || [],
		className = classes.join(' ');

	if (type === 'text') {
		return React.createElement(textElement, { className, }, value);
	} else if (tagName) {
		const pureTextStyle = utils.isWeb ?
				{} : { ...baseStyle, lineHeight: baseStyle.fontSize + 8 },
			childrenCreator = createChildren({ baseStyle, stylesheet, useInlineStyles }),
			children = childrenCreator(node.children),
			generatedTextStyle = createStyleObject(
				properties.className, { ...properties.style, ...pureTextStyle }, stylesheet);

		return React.createElement(textElement, {
			className, style: generatedTextStyle,
		}, children);
	}
}

function createChildren({ baseStyle, stylesheet, useInlineStyles }) {
	let childrenCount = 0;
	return (children) => {
		childrenCount += 1;
		return children.map((child, i) => {

			return <UniversalCodeRow
				key={`code-segment:${childrenCount}:${i}`}
				node={child}
				baseStyle={baseStyle}
				stylesheet={stylesheet}
				useInlineStyles={useInlineStyles}/>;
		});
	};
}

function rowRenderer({ rows, baseStyle, stylesheet, useInlineStyles }, { index, key }) {
	return <UniversalCodeRow
		node={rows[index]}
		baseStyle={baseStyle}
		stylesheet={stylesheet}
		useInlineStyles={useInlineStyles}
		key={key}/>;
}
```

```jsx
...
import { connect, ContextProvider, Button } from 'react-universal-ui';

@connect(({ app }) => {
	return {
		counter: app.counter,
	};
})

class MyComponent extends Component { ... }
```

## Yarn  
Inside your React Native Project, open terminal and run

That's it, now you are free to use all  
React Universal UI Components within your React Native app.

~~Here's our logo (hover to see the title text):~~

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"