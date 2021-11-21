const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes using GET: "api/notes/fatchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Fetching all notes :: Internal server error occured");
    }

});


//Route 2: Add a new note using POST: "api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // If there are erros return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error);
        res.status(500).send("Adding a note :: Internal server error occured");
    }


});

// Route 3: Update an existing Note using: POST "api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const { title, description, tag} = req.body;
    // Create a new note object

    const newNote = {};

    title ? newNote.title = title : null;
    description ? newNote.description = description : null;
    tag ? newNote.tag = tag : null;

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);

    if(!note){return res.status(404).send("Not Found")};
    
    if(note.user.toString() !== req.user.id ){
        return res.status(401).send("Not Allowed")
    };

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});

    res.send({note});
});

module.exports = router