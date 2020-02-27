import { SET_ERROR } from '../ActionTypes';

const initialState = {
    error: '',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: '[action.payload]',
            };
        default:
            return state;
    }
}
