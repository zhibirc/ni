import LexicalError from './errors/lexical';


/**
 * Lexical analyzer.
 *
 * Read input text and analyze each lexeme in according to language alphabet.
 *
 * @class
 */
export class Lexer {
    constructor ( text ) {
        this.text = text;
        this.position = 0;
        this.tokenList = [];
    }

    analyze () {
        return this.tokenList;
    }
}
