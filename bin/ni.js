#!/usr/bin/env node

'use strict';

// external
/** @see {@link https://www.npmjs.com/package/inquirer} */
const inquirer = require('inquirer');
/** @see {@link https://www.npmjs.com/package/commander} */
const {Command} = require('commander');
/** @see {@link https://www.npmjs.com/package/colors} */
const colors = require('colors/safe');

const fs = require('../src/utilities/fs');
// package.json as a source of meta information
const packageConfig = require('../package.json');


const cli = new Command();

let fileEntityList;

cli
    .name(packageConfig.name)
    .version(packageConfig.version)
    .description(`Compiler for ${packageConfig.description}.`)
    .option('-m, --minimize', 'Produce minimized compilation result files instead of unminified.')
    .option(
        '-d, --destination <destination>',
        'Path to directory where to put compiled sources.\nIf omit, compiled files will be put next to the sources.'
    )
    .usage('[-m, --minimize] <directory | file | directories | files | directories & files>')
    .argument('[files...]', 'paths for compiler works on', './')
    .action(files => (fileEntityList = files))
    .parse(process.argv);

let {minimize, destination} = cli.opts();

minimize = minimize === true;

if ( fs.isDirectory(destination) ) {
    destination = fs.normalizePath(destination);
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
}

//let textContent;

if ( fileEntityList.length === 0 ) {
    cli.help();
}

['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, process.exit));

process.on('uncaughtException', (/*error*/) => {
    process.exit(1);
});

// eslint-disable-next-line func-style
function run () {
    console.log(colors.green.bold('Please, wait...'));
}
