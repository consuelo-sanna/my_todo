import reducer from './notificheReducer';
import * as actionTypes from '../ActionTypes';
import { ExpansionPanelActions } from '@material-ui/core';

describe('notify reducer', () => {
    it('it should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            notifica: 'no notification yet',
        });
    });

    it('should store the message after an add', () => {
        expect(
            reducer(
                {
                    notifica: 'no notification yet',
                },
                {
                    type: actionTypes.NOTIFY_ADDED_TODO,
                    payload: 'utente',
                }
            )
        ).toEqual({ notifica: ['utente ha inserito un nuovo todo'] });
    });
});
