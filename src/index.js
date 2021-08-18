const Lexer = require('./lexer');

const text = '234 + 567 = 8; log("success");';
//const text = '&&& ^^^ $$$';

const lexer = new Lexer(text);

console.log(lexer.tokenize());
