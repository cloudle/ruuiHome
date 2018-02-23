export default {
	'code[class*="language-"]': {
		color: '#383a42',
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
		color: '#383a42',
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
		paddingRight: 3,
		margin: '.5em 0',
		overflow: 'auto',
		borderRadius: '0.3em',
		background: '#fafafa'
	},
	':not(pre) > code[class*="language-"]': {
		background: '#fafafa',
		padding: '.1em',
		borderRadius: '.3em'
	},
	comment: {
		color: '#a0a1a7'
	},
	prolog: {
		color: '#a0a1a7'
	},
	doctype: {
		color: '#a0a1a7'
	},
	cdata: {
		color: '#a0a1a7'
	},
	punctuation: {
		color: '#666666'
	},
	'.namespace': {
		Opacity: '.7'
	},
	property: {
		color: '#a626a4'
	},
	keyword: {
		color: '#a626a4'
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
		color: '#986801'
	},
	selector: {
		color: '#50a14f'
	},
	'attr-name': {
		color: '#50a14f'
	},
	string: {
		color: '#50a14f'
	},
	char: {
		color: '#50a14f'
	},
	builtin: {
		color: '#50a14f'
	},
	inserted: {
		color: '#50a14f'
	},
	variable: {
		color: '#986801'
	},
	operator: {
		color: '#e45649'
	},
	entity: {
		color: '#FFFFB6',
		cursor: 'help'
	},
	url: {
		color: '#a626a4'
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