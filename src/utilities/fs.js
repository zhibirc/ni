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

    isFile ( value ) {
        try {
            return value && native.statSync(this.normalizePath(value)).isFile();
        } catch {
            return false;
        }
    },

    isDirectory ( value ) {
        try {
            return value && native.statSync(this.normalizePath(value)).isDirectory();
        } catch {
            return false;
        }
    },

    isNiFile ( value ) {
        return this.isFile(value) && _path.extname(this.normalizePath(value)) === '.ni';
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
            native.writeFileSync(where, JSON.stringify(what, null, 2), {flag});

            return EXIT_CODE_SUCCESS;
        } catch {
            return EXIT_CODE_FAILURE;
        }
    },

    saveJsNextToNi ( where, ...rest ) {
        const name = _path.basename(where, '.ni');

        this.save(_path.join(_path.dirname(where), `${name}.js`), ...rest);
    },

    delete ( path ) {
        native.unlinkSync(path);

        return EXIT_CODE_SUCCESS;
    }
};
