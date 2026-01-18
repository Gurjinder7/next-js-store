import {expect, test} from "vitest";

function sum(...args: number[]) {
    return args.reduce((a, b) => a + b);
}

test('adds 1 and 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3)
})