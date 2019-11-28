
export interface ITryMe<E = any> {
    valid: Function,
    fail: (e: E) => void,
    finalize: Function,
    debugLevel: 1,
    // Fail Handling
    ifFailFireErr: boolean,
    fireErrUniqType: any,
    fireErrData: any
}

export const tryMe = <E>(tryThat: Function, meta: Partial<ITryMe<E>> = {}) => {
    const { valid, fail, finalize, ifFailFireErr, fireErrUniqType
        , fireErrData } = meta;

    try {
        tryThat();

        valid && valid();
    }
    catch (e) {
        fail && fail(e);

        if (ifFailFireErr) {
            if (!fireErrUniqType || (fireErrUniqType && e instanceof fireErrUniqType)) {
                if (fireErrData) throw fireErrData;

                throw new Error(e);
            }
        }
    }
    finally {
        finalize && finalize();
    }
}

export { tryMe as _try };
