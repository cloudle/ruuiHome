export default {
	'code[class*="language-"]': {
		color: '#ffffff',
		fontFamily: "Fira Code, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
		fontSize: 14,
		direction: 'ltr',
		textAlign: 'left',
		whiteSpace: 'pre',
		wordSpacing: 'normal',
		wordBreak: 'normal',
		lineHeight: '1.5',
		MozTabSize: '2',
		OTabSize: '2',
		tabSize: '2',
		WebkitHyphens: 'none',
		MozHyphens: 'none',
		msHyphens: 'none',
		hyphens: 'none',
	},
	'pre[class*="language-"]': {
		color: '#ffffff',
		textShadow: '0 1px rgba(0, 0, 0, 0.3)',
		fontFamily: "Fira Code, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
		direction: 'ltr',
		textAlign: 'left',
		whiteSpace: 'pre',
		wordSpacing: 'normal',
		wordBreak: 'normal',
		lineHeight: '1.5',
		MozTabSize: '4',
		OTabSize: '4',
		tabSize: '4',
		WebkitHyphens: 'none',
		MozHyphens: 'none',
		msHyphens: 'none',
		hyphens: 'none',
		padding: '1em',
		margin: '.5em 0',
		overflow: 'auto',
		borderRadius: '0.3em',
		background: '#343542'
	},
	':not(pre) > code[class*="language-"]': {
		background: '#343542',
		padding: '.1em',
		borderRadius: '.3em'
	},
	comment: {
		color: '#5c6370'
	},
	prolog: {
		color: '#5c6370'
	},
	doctype: {
		color: '#5c6370'
	},
	cdata: {
		color: '#5c6370'
	},
	punctuation: {
		color: '#E6E1DC'
	},
	'.namespace': {
		Opacity: '.7'
	},
	property: {
		color: '#c678dd'
	},
	keyword: {
		color: '#c678dd'
	},
	tag: {
		color: '#E06C75'
	},
	'class-name': {
		color: '#E8BF6A',
	},
	boolean: {
		color: '#99CC99'
	},
	constant: {
		color: '#99CC99'
	},
	symbol: {
		color: '#f92672'
	},
	deleted: {
		color: '#f92672'
	},
	number: {
		color: '#FF73FD'
	},
	selector: {
		color: '#98C379'
	},
	'attr-name': {
		color: '#98C379'
	},
	string: {
		color: '#98C379'
	},
	char: {
		color: '#98C379'
	},
	builtin: {
		color: '#98C379'
	},
	inserted: {
		color: '#98C379'
	},
	variable: {
		color: '#C6C5FE'
	},
	operator: {
		color: '#EDEDED'
	},
	entity: {
		color: '#FFFFB6',
		cursor: 'help'
	},
	url: {
		color: '#c678dd'
	},
	'.language-css .token.string': {
		color: '#87C38A'
	},
	'.style .token.string': {
		color: '#87C38A'
	},
	atrule: {
		color: '#F9EE98'
	},
	'attr-value': {
		color: '#F9EE98'
	},
	function: {
		color: '#DAD085'
	},
	regex: {
		color: '#E9C062'
	},
	important: {
		color: '#fd971f',
		fontWeight: 'bold'
	},
	bold: {
		fontWeight: 'bold'
	},
	italic: {
		fontStyle: 'italic'
	}
};

/*
export default {
	hljs: {
		display: 'block',
		overflowX: 'auto',
		padding: 12, paddingTop: 20, paddingBottom: 20,
		fontFamily: 'Fira Code', fontSize: 15, color: '#abb2bf',
		backgroundColor: '#282c34',
		borderRadius: 3,
		margin: 0, marginTop: 20, marginBottom: 20,
	},
	'hljs-comment': {
		color: '#5c6370',
		fontStyle: 'italic'
	},
	'hljs-quote': {
		color: '#5c6370',
		fontStyle: 'italic'
	},
	'hljs-doctag': {
		color: '#c678dd'
	},
	'hljs-keyword': {
		color: '#c678dd',
	},
	'hljs-formula': {
		color: '#c678dd'
	},
	'hljs-section': {
		color: '#e06c75'
	},
	'hljs-name': {
		color: '#e06c75'
	},
	'hljs-selector-tag': {
		color: '#e06c75'
	},
	'hljs-deletion': {
		color: '#e06c75'
	},
	'hljs-subst': {
		color: '#e06c75'
	},
	'hljs-literal': {
		color: '#56b6c2'
	},
	'hljs-string': {
		color: '#98c379'
	},
	'hljs-regexp': {
		color: '#98c379'
	},
	'hljs-addition': {
		color: '#98c379'
	},
	'hljs-attribute': {
		color: '#98c379'
	},
	'hljs-meta-string': {
		color: '#98c379'
	},
	'hljs-built_in': {
		color: '#e6c07b'
	},
	'hljs-class .hljs-title': {
		color: '#e6c07b'
	},
	'hljs-attr': {
		color: '#d19a66'
	},
	'hljs-variable': {
		color: '#d19a66'
	},
	'hljs-template-variable': {
		color: '#d19a66'
	},
	'hljs-type': {
		color: '#d19a66'
	},
	'hljs-selector-class': {
		color: '#d19a66'
	},
	'hljs-selector-attr': {
		color: '#d19a66'
	},
	'hljs-selector-pseudo': {
		color: '#d19a66'
	},
	'hljs-number': {
		color: '#d19a66'
	},
	'hljs-symbol': {
		color: '#61aeee'
	},
	'hljs-bullet': {
		color: '#61aeee'
	},
	'hljs-link': {
		color: '#61aeee',
		textDecoration: 'underline'
	},
	'hljs-meta': {
		color: '#61aeee'
	},
	'hljs-selector-id': {
		color: '#61aeee'
	},
	'hljs-title': {
		color: '#FFC66D'
	},
	'hljs-emphasis': {
		fontStyle: 'italic'
	},
	'hljs-strong': {
		fontWeight: 'bold'
	}
};
*/