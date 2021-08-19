'use strict';

// eslint-disable-next-line no-underscore-dangle
const _path = require('path');
const native = require('fs');

// constants
const {EXIT_CODE_SUCCESS, EXIT_CODE_FAILURE} = require('../constants/exit-codes.js');


const accessModes = {
    APPEND: 'a',
    TRUNC:  'w'
};

const types = {
    FILE: Symbol('FILE'),
    DIRECTORY: Symbol('DIRECTORY')
};

const defaultEncoding = 'utf8';


module.exports = {
    types,

    accessModes,

    isPathAccessable ( value ) {
        try {
            native.accessSync(value, native.constants.W_OK);

            return true;
        } catch {
            return false;
        }
    },

    normalizePath ( value = '' ) {
        return _path.resolve(value.trim());
    },

    isDirectory ( directory ) {
        try {
            return directory && native.statSync(this.normalizePath(directory)).isDirectory();
        } catch {
            return false;
        }
    },

    make ( path, type ) {
        if ( type === types.DIRECTORY ) {
            native.mkdirSync(path);
        }

        return this;
    },

    read ( path, encoding = defaultEncoding) {
        return native.readFileSync(path, {encoding});
    },

    save ( where, what, flag = accessModes.APPEND ) {
        try {
            native.writeFileSync(where, what, {flag});

            return EXIT_CODE_SUCCESS;
        } catch {
            return EXIT_CODE_FAILURE;
        }
    },

    delete ( path ) {
        native.unlinkSync(path);

        return EXIT_CODE_SUCCESS;
    }
};
