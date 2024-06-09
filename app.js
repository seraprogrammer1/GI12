const notes = require('./notes');
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')

const command = process.argv[2]

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNotes(argv.title,argv.body)
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Removing the note',
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    },
    handler: argv => notes.removeNotes(argv.title)
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'Lists all the notes',
    handler: () => notes.listNotes()
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    },
    handler: argv => notes.getNotes(argv.title)
})

yargs.parse()

//console.log(yargs.argv)
