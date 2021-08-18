#!/usr/bin/env node

'use strict';

// external
/** @see {@link https://www.npmjs.com/package/commander} */
const {Command} = require('commander');

// package.json as a source of meta information
const packageConfig = require('../../package.json');


const cli = new Command();

let fileEntityList;

cli
    .name(packageConfig.name)
    .version(packageConfig.version)
    .description(`Compiler for ${packageConfig.description}`)
    .option('-m, --minimize', 'create minimized version too')
    .usage('[-m, --minimize] <directory | file | directories | files | directories & files>')
    .argument('[files...]', 'paths for compiler works on', './')
    .action(files => (fileEntityList = files))
    .parse(process.argv);

//const options = cli.opts();

//let textContent;

if ( fileEntityList.length === 0 ) {
    cli.help();
}

['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, process.exit));

process.on('uncaughtException', (/*error*/) => {
    process.exit(1);
});

console.log('Please, wait...');
