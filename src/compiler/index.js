'use strict';

const Lexer = require('./lexer');
const Parser = require('./parser');


module.exports = {
    scan ( text ) {
        const lexer = new Lexer(text);

        return lexer.tokenize();
    },

    parse ( tokenList ) {
        const parser = new Parser(tokenList);

        return parser.parse();
    }
};
