/**
 * Lexical analyzer class.
 *
 * Take raw text as an input and produce token stream as an output.
 */


'use strict';

const LexicalError = require('../errors/lexical');
const Token = require('./token');
const {alphabetPatternList} = require('../terminals/alphabet');

/**
 * Lexical analyzer.
 *
 * Analyze each lexeme from the given text in according to language alphabet/terminals/grammar.
 */
class Lexer {
    /**
     * Lexer constructor.
     *
     * @constructor
     * @param {string} text - plain text as code source
     *
     * @return {Lexer} instance of Lexer analyzer
     */
    constructor ( text ) {
        this.text = text.trim();
        this.position = 0;
        this.tokenList = [];
    }

    /**
     * Tokenize source code.
     *
     * Analyze source text/code in according to language grammar and produce a structure of tokens.
     *
     * @return {Token[]} array of Token instances
     */
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
                    // TODO: specify code fragment or invalid token for better UX
                    throw new LexicalError(this.position);
                }

                this.tokenList.push(new Token(
                    this.position,
                    token.group,
                    token.type,
                    match[0]
                ));

                this.position += match[0].length;
            } else {
                ++this.position;
            }
        }

        return this.tokenList;
    }
}


module.exports = Lexer;
