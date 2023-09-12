import React from 'react';
import {userReducer} from './user-reducer';

let startState: {age: number, childrenCount: number, name: string};

beforeEach(() => {
    startState = { age: 35, childrenCount: 1, name: 'Igor' };
})

test('user reducer should increment only age', () => {
    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(36);
    expect(endState.childrenCount).toBe(1);
});

test('user reducer should increment only childrenCount', () => {
    const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' })

    expect(endState.age).toBe(35);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should change name of user', () => {
    const newName = 'Oksana';
    const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName })

    expect(endState.name).toBe(newName);
});


