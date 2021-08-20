'use strict';

/**
 * Special error class for lexical errors in input data.
 *
 * @class
 */
class LexicalError extends Error {
    constructor ( position, message ) {
        super();

        this.message = `${message || 'Lexical error: unknown lexeme on position '}${position}`;
    }
}


module.exports = LexicalError;
