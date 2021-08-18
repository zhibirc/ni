/**
 * Basic language alphabet/lexemes.
 * Define full set of terminals for all language aspects.
 */


export const alphabet = {
    VARIABLE: /(?:[A-Z]+(?:_[A-Z]+)*|\$?[a-z][a-zA-Z]+)/,

    EOF: ';',

    operators: {
        single: {
            ASSIGNMENT:     /=/,
            ADDITION:       /\+/,
            DIVISION:       /\//,
            EXPONENTIATION: /\^/,
            LEFT_BRACE:     /\(/,
            RIGHT_BRACE:    /\)/,
            MULTIPLICATION: /\*/,
            SUBTRACTION:    /-/,
        },
        double: {
            IDENTITY:  /==/,
            INCREMENT: /\+\+/,
            DECREMENT: /--/
        }
    },

    keywords: {
        LOOP:      'till',
        IF:        'if',
        ELSE:      'else',
        EXCEPTION: 'oops',
        LOG:       'log',
        NOP:       'nop'
    },

    literals: {
        STRING:  /'[^']*'|"[^"]*"/,
        NUMBER:  /-?\d+(\.\d+)?/,
        BOOLEAN: /true|false/,
        LIST:    /\[(?:[^\]]*,)?[^\]]*\]/
    }
};
