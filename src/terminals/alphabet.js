/**
 * Basic language alphabet/lexemes.
 * Define full set of terminals for all language aspects.
 */


const alphabet = {
    names: {
        VARIABLE: /(?:[A-Z]+(?:_[A-Z]+)*|\$?[a-z][a-zA-Z]+)/
    },

    terminators: {
        EOF: /;/
    },

    operators: {
        IDENTITY:       /==/,
        INCREMENT:      /\+\+/,
        DECREMENT:      /--/,

        ASSIGNMENT:     /=/,
        ADDITION:       /\+/,
        DIVISION:       /\//,
        EXPONENTIATION: /\^/,
        LEFT_BRACE:     /\(/,
        RIGHT_BRACE:    /\)/,
        MULTIPLICATION: /\*/,
        SUBTRACTION:    /-/
    },

    keywords: {
        LOOP:      /till/,
        IF:        /if/,
        ELSE:      /else/,
        EXCEPTION: /oops/,
        LOG:       /log/,
        NOP:       /nop/
    },

    literals: {
        STRING:  /'[^']*'|"[^"]*"/,
        NUMBER:  /-?\d+(\.\d+)?/,
        BOOLEAN: /true|false/,
        LIST:    /\[(?:[^\]]*,)?[^\]]*\]/
    }
};

const alphabetPatternList = (() => {
    const list = [];

    (function traverse ( alphabet, group ) {
        for ( const [key, value] of Object.entries(alphabet) ) {
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
