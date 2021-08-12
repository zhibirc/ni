/**
 * Basic language alphabet/lexemes.
 * Define full set of terminals for all language aspects.
 */


export const alphabet = {
    VARIABLE: /^(?:[A-Z]+(?:_[A-Z]+)*|\$?[a-z][a-zA-Z]+)$/,

    EOF: ';',

    operators: {
        IDENTITY:       '==',
        ADDITION:       '+',
        SUBTRACTION:    '-',
        MULTIPLICATION: '*',
        DIVISION:       '/',
        EXPONENTIATION: '^',
        LEFT_BRACE:     '(',
        RIGHT_BRACE:    ')'
    },

    keywords: {
        LOOP:      'till',
        IF:        'if',
        ELSE:      'else',
        EXCEPTION: 'oops',
        LOG:       'log',
        NOP:       'nop'
    }
};
