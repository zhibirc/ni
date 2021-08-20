'use strict';


module.exports = {
    extends: require.resolve('cjs-eslint'),
    rules: {
        'padding-line-between-statements': ['error', {blankLine: 'always', prev: '*', next: 'return'}],
        'max-len': [
            'error',
            {
                code: 150,
                tabWidth: 4,
                ignoreUrls: true,
                ignoreStrings: true
            }
        ]
    }
};
