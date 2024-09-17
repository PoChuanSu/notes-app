const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNotes = function (title, body) {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
        title:title,
        body:body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))

    } else {
        console.log(chalk.red('Note title taken!'))
    }
}

const removeNotes = function (title) {
    const notes = loadNotes();
    const latestNotes = notes.filter(function(note){
        return note.title !== title
    })

    if (notes.length !== latestNotes.length) {
        saveNotes(latestNotes);
        console.log(chalk.green('Note removed!'))
    } else {
        console.log(chalk.red('Could not find the note!'))
    }
}

const loadNotes = function () {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
        
    } catch (e) {
        return []
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes
}