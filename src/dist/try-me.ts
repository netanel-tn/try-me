import { HadErr } from './util';

export interface ITryMe<E = any> {
    valid: () => void;
    fail: (e: E) => void;
    finalize: () => void;
    debugLevel: 'quiet';

    // Fail Handling
    ifFailFireErr: boolean;
    fireErrUniqType: any;
    fireErrData: any;
}

export const tryMe = <E>(tryThat: Function, meta: Partial<ITryMe<E>> = {}) => {
    const { valid, fail, finalize, ifFailFireErr, fireErrUniqType
        , fireErrData } = meta;
    let hadErr: HadErr = null;

    try {
        tryThat();

        valid && valid();
    }
    catch (e) {
        fail && fail(e);

        hadErr = e;
    }
    finally {
        finalize && finalize();

        if (hadErr) {
            if (ifFailFireErr) {
                if (!fireErrUniqType || (fireErrUniqType && hadErr instanceof fireErrUniqType)) {
                    if (fireErrData) throw fireErrData;

                    throw new Error(hadErr);
                }
            }
        }
    }
}

export { tryMe as _try };
export default {};
