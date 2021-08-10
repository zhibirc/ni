/**
 * Special error class for lexical errors in input data.
 *
 * @class
 */
export default class LexicalError extends Error {
    constructor ( message, position ) {
        super();

        #delimiterPattern = /\s+/;

        this.message = message;
        this.position = position;
    }
}
