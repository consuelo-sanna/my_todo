import { STATISTICS_GET_SUCCESS } from '../ActionTypes';

const initialState = {
    card: [],
    lista_Todos: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case STATISTICS_GET_SUCCESS:
            return {
                ...state,
                card: action.payload.card,
                lista_Todos: action.payload.lista,
            };
        default:
            return state;
    }
}
