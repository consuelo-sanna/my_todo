import test from 'tape';

import { addAsync, delay } from './sagas';
import { put, call } from 'redux-saga/effects';

test('markAsync Saga test', assert => {
    const gen = addAsync();

    assert.deepEqual(
        gen.next().value,
        call(delay, 200),

        'addAsync should return a Promise that will resolve after 1 second'
    );

    assert.deepEqual(
        gen.next(),
        { done: true, value: undefined },
        'add saga must be done'
    );
    assert.end();
});
