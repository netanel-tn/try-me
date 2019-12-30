import { tryMe } from "./try-me";

describe('ab', () => {
    it('a', () => {
        tryMe(() => { });
        expect(0).toBe(0);
    });

    it('b', () => {
        tryMe(() => { });
        expect(1).toBe(0);
    });
});
