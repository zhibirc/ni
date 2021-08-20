#!/usr/bin/env node

'use strict';

// external
/** @see {@link https://www.npmjs.com/package/inquirer} */
const inquirer = require('inquirer');
/** @see {@link https://www.npmjs.com/package/commander} */
const {Command} = require('commander');
/** @see {@link https://www.npmjs.com/package/colors} */
const colors = require('colors/safe');

const compiler = require('../src/compiler');
const formatOptions = require('../src/constants/format-options');
const fs = require('../src/utilities/fs');
// package.json as a source of meta information
const packageConfig = require('../package.json');


const cli = new Command();

cli
    .name(packageConfig.name)
    .version(packageConfig.version)
    .description(`Compiler for ${packageConfig.description}.`)
    .option(
        '-s, --source [source]',
        'Ni source file or containing directory.\nIf omit, process all *.ni files in current directory only.\nIf directory is specified it\'ll be scan recursively.'
    )
    .option(
        '-d, --destination [destination]',
        'Path to directory where to put compiled sources.\nIf omit, compiled files will be put next to the sources.'
    )
    .option(
        '-c, --config [config]',
        'ni.(js|json) configuration file for Ni compiler.'
    )
    .option('-m, --minimize', 'Produce minimized compilation result files instead of unminified.')
    .usage('[-s, --source [source]] [-d, --destination [destination]] [-m, --minimize]')
    .parse(process.argv);

const {source, destination, minimize} = cli.opts();
let userConfig;

const resultConfig = {
    source: {
        isFile:  null,
        recurse: null,
        path:    null
    },
    destination: null,
    formatOptions: {},
    minimize: minimize === true
};

try {
    userConfig = require(cli.opts().config);

    resultConfig.formatOptions = userConfig.formatOptions;
} catch {
    resultConfig.formatOptions = formatOptions;
}

(function validate ( _source ) {
    if ( fs.isDirectory(_source) ) {
        // process all *.ni files in current working directory and in all subdirectories recursively
        resultConfig.source.isFile = false;
        resultConfig.source.recurse = true;
        resultConfig.source.path = fs.normalizePath(_source);
    } else if ( fs.isNiFile(_source) ) {
        // process given *.ni file
        resultConfig.source.isFile = true;
        resultConfig.source.path = fs.normalizePath(_source);
    } else if ( _source === undefined ) {
        // process all *.ni files in current working directory only

        // if configuration file is specified try to use info from it
        if ( userConfig && userConfig.source ) {
            validate(userConfig.source);
        } else {
            resultConfig.source.isFile = false;
            resultConfig.source.recurse = false;
            resultConfig.source.path = fs.normalizePath('./');
        }
    } else {
        // report and exit if source is specified but it's impossible to determine it's nature
        console.error(colors.red(`Given value "${_source}" is incorrect file system path (directory or *.ni file).`));
        process.exit(1);
    }
})(source);

if ( fs.isDirectory(destination) ) {
    resultConfig.destination = fs.normalizePath(destination);
    // eslint-disable-next-line no-use-before-define
    run();
} else if ( destination ) {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'destination',
                message: 'Given directory path is incorrect. Do you prefer to put compilation results next to corresponding sources?',
                default: true
            }
        ])
        .then(answers => {
            if ( !answers.destination ) {
                console.warn(colors.yellow.bold('\nSpecify correct destination path and try again.'));
                process.exit(1);
            }

            // eslint-disable-next-line no-use-before-define
            run();
        })
        .catch(error => {
            // TODO: handle it gracefully
            if ( error.isTtyError ) {
                console.log();
            } else {
                console.log();
            }
        });
} else {
    // eslint-disable-next-line no-use-before-define
    run();
}

['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, process.exit));

process.on('uncaughtException', (/*error*/) => {
    process.exit(1);
});

// eslint-disable-next-line func-style
function run () {
    // eslint-disable-next-line no-shadow
    const {source: {isFile, path}, destination} = resultConfig;
    let textContent;

    console.log(colors.green.bold('Please, wait...'));

    if ( isFile ) {
        textContent = fs.read(path);

        switch ( destination ) {
            case null:
                fs.saveJsNextToNi(path, compiler.scan(textContent), fs.accessModes.TRUNC);
                break;
        }
    }

    console.log(colors.cyan('Success.'));
}
