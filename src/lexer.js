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
        let accumulatedValue = '';
        let currentCharacter;

        while ( this.position < textLength ) {
            currentCharacter = this.text[this.position];

            if ( /\s/.test(currentCharacter) ) {
                if ( accumulatedValue ) {
                    this.tokenList.push({
                        // use this information later on the token recognition stage to produce meaningful and helpful error message if token is of unknown type
                        position: this.position - accumulatedValue.length,
                        value: accumulatedValue
                    });
                    accumulatedValue = null;
                }
            } else {
                accumulatedValue += currentCharacter;
            }

            ++this.position;
        }

        return this.tokenList;
    }
}
