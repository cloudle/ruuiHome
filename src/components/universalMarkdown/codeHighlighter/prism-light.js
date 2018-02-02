import highlight from './highlight';
import refractor from './refractor';

refractor.hooks.add('before-highlight', (env) => {
	const tokens = env.grammar;
	if (!tokens) return;

	tokens.tab = /\t/g;
	tokens.crlf = /\r\n/g;
	tokens.lf = /\n/g;
	tokens.cr = /\r/g;
	tokens.space = / /g;
});

export const registerLanguage = (_, language) => refractor.register(language);
export default highlight(refractor, {});