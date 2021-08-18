'use strict';

class Token {
    constructor ( value ) {
        this.type = null;
        this.value = value;
        this.position = 0;
    }
}


module.exports = Token;
