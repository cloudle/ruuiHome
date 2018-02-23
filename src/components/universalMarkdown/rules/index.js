import { defaultRules } from 'simple-markdown';
import heading from './heading';
import paragraph from './paragraph';
import underline from './underline';
import blockQuote from './blockQuote';
import em from './em';
import del from './del';
import { hr, fatHr } from './hr';
import newline from './newline';
import br from './br';
import strong from './strong';
import autolink from './autolink';
import link from './link';
import inlineCode from './inlineCode';
import codeBlock from './codeBlock';
import image from './image';
import list from './list';
import text from './text';
import checkList from './checklist';

export default {
	...defaultRules,
	heading,
	paragraph,
	underline,
	blockQuote,
	newline, br, em, del, hr, fatHr,
	strong,
	autolink,
	link,
	inlineCode,
	codeBlock,
	image,
	list,
	text,
	// checkList,
};