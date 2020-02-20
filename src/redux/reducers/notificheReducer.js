import { NOTIFY_ADDED_TODO } from '../ActionTypes';

const initialState = {
    notifica: [],
};

export default function(state = initialState, action) {
    debugger;
    switch (action.type) {
        case NOTIFY_ADDED_TODO:
            return {
                ...state,
                notifica: [
                    action.payload + ' ha inserito un nuovo todo ',
                    ...state.notifica,
                ],
            };
        default:
            return state;
    }
}
