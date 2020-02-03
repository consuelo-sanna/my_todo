import test from 'tape';

import { markAsync, delay } from './sagas';
import { put, call } from 'redux-saga/effects';

test('markAsync Saga test', assert => {
    const gen = markAsync();

    assert.deepEqual(
        gen.next().value,
        call(delay, 1000),

        'markAsync should return a Promise that will resolve after 1 second'
    );

    assert.deepEqual(
        gen.next().value,
        put({ type: 'MARK_TODO' }),
        'async saga must dispatch an MARK action'
    );

    assert.deepEqual(
        gen.next(),
        { done: true, value: undefined },
        'mark saga must be done'
    );
    assert.end();
});
