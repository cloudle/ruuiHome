import HomeScene from './scenes/home';
import DocumentScene from './scenes/docs';
import TutorialScene from './scenes/tutorials';
import MeetupScene from './scenes/meetups';
import NotFoundScene from './scenes/notFound';

export const routes = [{
	path: '/',
	exact: true,
	component: HomeScene,
}, {
	path: '/docs/:id',
	component: DocumentScene,
}, {
	path: '/docs',
	component: DocumentScene,
}, {
	path: '/tutorials',
	component: TutorialScene,
}, {
	path: '/meetups',
	component: MeetupScene,
}, {
	component: NotFoundScene,
}, ];