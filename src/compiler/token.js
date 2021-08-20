'use strict';

class Token {
    constructor ( position, group, type, value ) {
        this.position = position;
        this.group = group;
        this.type = type;
        this.value = value;
    }
}


module.exports = Token;
