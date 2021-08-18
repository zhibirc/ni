/**
 * Lexical analyzer.
 */


const LexicalError = require('./errors/lexical');
const alphabetPatternList = require('./terminals/alphabet').alphabetPatternList;


/**
 * Lexical analyzer.
 *
 * Read input text and analyze each lexeme in according to language alphabet.
 *
 * @class
 */
class Lexer {
    constructor ( text ) {
        this.text = text.trim();
        this.position = 0;
        this.tokenList = [];
    }

    tokenize () {
        const textLength = this.text.length;

        while ( this.position < textLength ) {
            if ( /\S/.test(this.text[this.position]) ) {
                let match;

                const token = alphabetPatternList.find(item => {
                    match = this.text.slice(this.position).match(item.pattern);

                    return Boolean(match);
                });

                if ( !token ) {
                    throw new LexicalError(this.position);
                }

                this.tokenList.push({
                    // use this information later on the token recognition stage to produce meaningful and helpful error message if token is of unknown type
                    position: this.position,
                    group: token.group,
                    type: token.type,
                    value: match[0]
                });

                this.position += match[0].length;
            } else {
                ++this.position;
            }
        }

        return this.tokenList;
    }
}


module.exports = Lexer;
