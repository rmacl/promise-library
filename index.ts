export interface CancelablePromise<T> extends Promise<T> {
    cancel(): any;
}

// tslint:disable:promise-must-complete
export const makeCancelable = <T>(promise: Promise<T>): CancelablePromise<T> => {
    let cancel;
    let resolve;

    //Creates Promise which resolves or rejects when either attached resolve() or reject() is called
    const deferred = new Promise((res, rej) => {
        cancel = rej;
        resolve = res;
    });

    const wrappedPromise: any = Promise.race([promise, deferred]);
    wrappedPromise.cancel = cancel;
    wrappedPromise.resolve = resolve;

    return wrappedPromise;
};