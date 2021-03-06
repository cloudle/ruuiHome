import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { ruuiMiddleware } from 'react-universal-ui';
import reducers from './reducers';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
	composeEnhancers = global[DEVTOOLS] || compose,
	loggerIncludes = new Set([
		// actions.ExplorerSyncObjects,
	]),
	logger = createLogger({
		predicate: (getState, action) => {
			return loggerIncludes.has(action.type);
		},
	});

export default function configureStore(initialState) {
	const enhancers = composeEnhancers(applyMiddleware(logger, ruuiMiddleware()));

	const store = initialState
		? createStore(reducers, initialState, enhancers)
		: createStore(reducers, enhancers);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}

export const store = configureStore();
