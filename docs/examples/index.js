const Lexer = require('../../src/lexer');

const codeCorrect = '234 - 567 = 8; log("success");';
const codeIncorrect = '&&& ^^^ $$$';

const lexer = new Lexer(codeCorrect);

console.log(lexer.tokenize());
