import { combineReducers } from 'redux';
import { ruuiReducer } from 'react-universal-ui';
import appReducer from './app';

export default combineReducers({
	app: appReducer,
	ruui: ruuiReducer,
});