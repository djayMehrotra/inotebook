import { useState } from "react";
import NoteContext from "./noteContext";

const noteInitial = [];

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState(noteInitial);
  const aboutUsDetails = {
    "name": "Harry",
    "class": "5b"
  }
  /* const [state, setState] = useState(s1) */
  // eslint-disable-next-line
  const [aboutUsState, setaboutUsState] = useState(aboutUsDetails);

  //Get all notes
  const getAllNotes = async () => {
    // API Calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);
  }

  const addNote = async (title, description, tag) => {
    //TODO API CALLL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    /* console.log(json);
    console.log('Addin a new note');
    let note = {
      "title": title,
      "description": description,
      "tag": tag
    } */
    setNotes(notes.concat(note));
  }

  //Delete a note
  const deleteNote = async (id) => {
    //TODO API CALLL
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    console.log(`deleting a note` + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
    
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);
    //logic to edit in client
    let newNote = JSON.parse(JSON.stringify(notes));
    // why this??
    /* deep copy is created -- notes array */
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
    setNotes(newNote);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes, aboutUsDetails }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;