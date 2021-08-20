const Lexer = require('../../src/compiler/lexer');

const codeCorrect = '234 - 567 = 8; log("success");';
const codeIncorrect = '&&& ^^^ $$$';

const lexer = new Lexer(codeCorrect);

console.log(lexer.tokenize());
