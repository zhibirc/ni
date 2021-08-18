/**
 * Basic language alphabet/lexemes.
 * Define full set of terminals for all language aspects.
 */

'use strict';


const alphabet = {
    terminators: {
        EOF: /^;/
    },

    operators: {
        IDENTITY:       /^==/,
        INCREMENT:      /^\+\+/,
        DECREMENT:      /^--/,

        ASSIGNMENT:     /^=/,
        ADDITION:       /^\+/,
        DIVISION:       /^\//,
        EXPONENTIATION: /^\^/,
        LEFT_BRACE:     /^\(/,
        RIGHT_BRACE:    /^\)/,
        MULTIPLICATION: /^\*/,
        SUBTRACTION:    /^-/
    },

    keywords: {
        LOOP:      /^till/,
        IF:        /^if/,
        ELIF:      /^elif/,
        ELSE:      /^else/,
        EXCEPTION: /^oops/,
        LOG:       /^log/,
        NOP:       /^nop/
    },

    literals: {
        STRING:  /^(?:'[^']*'|"[^"]*")/,
        NUMBER:  /^-?\d+(?:\.\d+)?/,
        BOOLEAN: /^(?:true|false)/,
        LIST:    /\[(?:[^\]]*,)?[^\]]*\]/
    },

    names: {
        VARIABLE: /^(?:[A-Z]+(?:_[A-Z]+)*|\$?[a-z][a-zA-Z]+)/
    }
};

const alphabetPatternList = (() => {
    const list = [];

    (function traverse ( terms, group ) {
        for ( const [key, value] of Object.entries(terms) ) {
            value.constructor.name === 'RegExp' && list.push({group, type: key, pattern: value});
            value.constructor.name !== 'RegExp' && traverse(value, key);
        }
    })(alphabet);

    return list;
})();


module.exports = {
    alphabet,
    alphabetPatternList
};
