/**
/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
var cancellable = function(generator) {
    let cancelRequested = false;

    const cancel = () => {
        cancelRequested = true;
    };

    const promise = new Promise((resolve, reject) => {
        const step = (fn, arg) => {
            let result;
            try {
                // Run the action. If it is a throw, the generator might catch it internally!
                result = fn.call(generator, arg);
            } catch(err) {
                // If the generator doesn't catch the error, only THEN do we reject
                reject(err);
                return;
            }

            const { value, done } = result;

            if (done) {
                resolve(value);
                return;
            }

            Promise.resolve(value).then(
                val => {
                    // Check cancellation state right before calling the next step
                    if (cancelRequested) {
                        step(generator.throw, "Cancelled");
                    } else {
                        step(generator.next, val);
                    }
                },
                err => {
                    // If a yielded promise rejects, throw that error back into the generator
                    step(generator.throw, err);
                }
            );
        };

        // Kick off the execution loop
        step(generator.next);
    });

    return [cancel, promise];
};

/**
 * function* tasks() {
 *   const val = yield new Promise(resolve => resolve(2 + 2));
 *   yield new Promise(resolve => setTimeout(resolve, 100));
 *   return val + 1;
 * }
 * const [cancel, promise] = cancellable(tasks());
 * setTimeout(cancel, 50);
 * promise.catch(console.log); // logs "Cancelled" at t=50ms
 */