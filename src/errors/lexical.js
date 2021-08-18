/**
 * Special error class for lexical errors in input data.
 *
 * @class
 */
class LexicalError extends Error {
    constructor ( message, position ) {
        super();

        this.message = `${message}${position}`;
    }
}


module.exports = LexicalError;
