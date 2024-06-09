const fs = require('fs')
const chalk = require('chalk')

module.exports = {

    getNotes: function(title) {
        const notes = this.loadNotes()

        const Note = notes.find(note => note.title === title)

        if (Note){
            console.log(chalk.green.inverse(Note.body))
        }   else {
            console.log(chalk.red.inverse("Note not found"))
        }
    },

    addNotes: function(title, body) {
        const notes = this.loadNotes()

        const duplicateNote = notes.find(note => note.title === title)

        if (!duplicateNote){
            notes.push({title: title, body: body})
        
            console.log(chalk.green.inverse("New note added"))
            this.saveNotes(notes)
        } else {
            console.log(chalk.red.inverse("Note title Taken"))
        }

    },

    removeNotes: function(title) {
        const notes = this.loadNotes()

        const newNotes = notes.filter(note => note.title !== title)

        if ((notes.length - newNotes.length) === 1){
            
            console.log(chalk.green.inverse("Removed note!"))
            this.saveNotes(newNotes)
        }
        else{
            console.log(chalk.red.inverse("No note found!"))
        }
    },
    listNotes: function(){
        const notes = this.loadNotes()

        console.log(chalk.white.inverse("Your notes:"))
        notes.forEach((note) => {console.log("Title: " + note.title)})
    },
    saveNotes: function(notes) {
        const dataJSON = JSON.stringify(notes);
        fs.writeFileSync('notes.json', dataJSON)
    },

    loadNotes: function() {
        try {
            const dataBuffer = fs.readFileSync('notes.json')
            const dataJSON = dataBuffer.toString()
            return JSON.parse(dataJSON)
        } catch(e) {
            return [];
        }
    }
}