'use strict';

/**
 * Special error class for lexical errors in input data.
 *
 * @class
 */
class LexicalError extends Error {
    constructor ( message, position ) {
        super();

        this.message = `${message || 'Lexical error: unknown lexeme on position '}${position}`;
    }
}


module.exports = LexicalError;
