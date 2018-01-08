import { appReducer } from 'react-universal-ui';
import * as Actions from '../actions';

const initialState = {
	counter: 0,
	pageScrollOffset: { x: 0, y: 0 },
};

export default appReducer((state = initialState, action) => {
	switch (action.type) {
	case Actions.IncreaseCounter:
		return { ...state, counter: state.counter + action.volume };
	case Actions.SetPageScrollOffset:
		return { ...state, pageScrollOffset: { ...state.pageScrollOffset, ...action.offset } };
	default:
		return state;
	}
});