/**
 * Basic language alphabet/lexemes.
 */


export const alphabet = {
    VARIABLE: /^(?:[A-Z]+(?:_?[A-Z]+)+|\$[a-z]{2,}[a-zA-Z]{2,78}|[a-zA-Z]{3,80})$/,

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
        CONDITION: 'if'
    }
};
