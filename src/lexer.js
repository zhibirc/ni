import LexicalError from './errors/lexical';
import { alphabet } from './terminals/alphabet';


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

    tokenize () {
        const textLength = this.text.length;

        while ( this.position < textLength ) {

        }

        return this.tokenList;
    }
}
