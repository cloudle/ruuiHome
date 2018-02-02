const restore = capture();

/* istanbul ignore next - Don't allow Prism to run on page load in browser. */
const ctx = typeof window === 'undefined' ? {} : window;

ctx.Prism = { manual: true };

/* Load all stuff in `prism.js` itself, except for
 * `prism-file-highlight.js`.
 * The wrapped non-leaky grammars are loaded instead of
 * Prism’s originals. */
const h = require('hastscript');
const Prism = require('prismjs/components/prism-core');
const markup = require('./lang/markup');
const css = require('./lang/css');
const clike = require('./lang/clike');
const js = require('./lang/javascript');

restore();

const own = {}.hasOwnProperty;

/* Inherit. */
function Refractor() {}

Refractor.prototype = Prism;

/* Construct. */
const refract = new Refractor();

/* Expose. */
export default refract;

/* Create. */
refract.highlight = highlight;
refract.register = register;
refract.registered = registered;

/* Register bundled grammars. */
register(markup);
register(css);
register(clike);
register(js);

refract.util.encode = encode;
refract.Token.stringify = stringify;

function register(grammar) {
	if (typeof grammar !== 'function' || !grammar.displayName) {
		throw new Error('Expected `function` for `grammar`, got `' + grammar + '`');
	}

	/* Do not duplicate registrations. */
	if (refract.languages[grammar.displayName] === undefined) {
		grammar(refract);
	}
}

function highlight(value, name, language) {
	const sup = Prism.highlight;

	if (typeof value !== 'string') {
		throw new Error('Expected `string` for `value`, got `' + value + '`');
	}

	if (typeof name !== 'string') {
		throw new Error('Expected `string` for `name`, got `' + name + '`');
	}

	if (!own.call(refract.languages, name)) {
		throw new Error('Unknown language: `' + name + '` is not registered');
	}

	const syntax = refract.languages[name];
	value = value.replace(new RegExp(' {' + 4 + '}', 'g'), '\t'); /* <==hack */
	syntax.tab = /\t/g;
	syntax.space = / /g;

	return sup.call(this, value, syntax, language);
}

function registered(language) {
	if (typeof language !== 'string') {
		throw new Error('Expected `string` for `language`, got `' + language + '`');
	}

	return own.call(refract.languages, language);
}

function stringify(value, language, parent) {
	let env;

	if (typeof value === 'string') {
		return { type: 'text', value };
	}

	if (refract.util.type(value) === 'Array') {
		return stringifyAll(value, language);
	}

	env = {
		type: value.type,
		content: refract.Token.stringify(value.content, language, parent),
		tag: 'span',
		classes: ['token', value.type],
		attributes: {},
		language,
		parent
	};

	if (value.alias) {
		env.classes = env.classes.concat(value.alias);
	}

	refract.hooks.run('wrap', env);

	return h(
		env.tag + '.' + env.classes.join('.'),
		env.attributes,
		env.content
	);
}

function stringifyAll(values, language) {
	const result = [];
	let length = values.length;
	let index = -1;
	let value;

	while (++index < length) {
		value = values[index];

		if (value !== '' && value !== null && value !== undefined) {
			result.push(value);
		}
	}

	index = -1;
	length = result.length;

	while (++index < length) {
		value = result[index];
		result[index] = refract.Token.stringify(value, language, result);
	}

	return result;
}

function encode(tokens) {
	return tokens;
}

function capture() {
	let defined = 'Prism' in global;
	/* istanbul ignore next */
	let current = defined ? global.Prism : undefined;

	return restore;

	function restore() {
		/* istanbul ignore else - Clean leaks after Prism. */
		if (defined) {
			global.Prism = current;
		} else {
			delete global.Prism;
		}

		defined = undefined;
		current = undefined;
	}
}