import { NOTIFY_ADDED_TODO } from '../ActionTypes';

const initialState = {
    notifica: 'no notification yet',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case NOTIFY_ADDED_TODO:
            return {
                ...state,
                notifica: [
                    action.payload + ' ha inserito un nuovo todo ',
                ],
            };
        default:
            return state;
    }
}
