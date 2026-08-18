/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function(n) {
    
    return function() {
        return n++
    };
};

/** 
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */

 /**
 Inside the createCounter, I store the current count in a varible (let current = n)

Then return a function that : 
- Returns the current value 
- increments it by 1 for next time 

That way, everytime you call the return function, it  "remembers" the last number.  */