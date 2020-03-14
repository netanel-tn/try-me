import { metName } from './util';
import { tryMe } from './try-me';

describe(metName('tryMe'), () => {
    it('should throw an exception and swallow it.', () => {
        try {
            tryMe(() => Array()[<any>'myFn']());
        }
        catch (e) {
            return fail(1);
        }

        expect(1).toBe(1);
    });

    it('should throw an exception and throw it back.', () => {
        try {
            tryMe(() => Array()[<any>'myFn'](), { ifFailFireErr: true });
        }
        catch (e) {
            return expect(1).toBe(1);
        }

        fail(1);
    });
});
