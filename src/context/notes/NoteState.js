import { useState } from "react";
import NoteContext from "./noteContext";

const noteInitial = [];

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState(noteInitial);

  //Get all notes
  const getAllNotes = async () => {
    // API Calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ODllMjk2OTdlNzdhNTA3ZGRkNWJhIn0sImlhdCI6MTYzNzQ3Njk1MX0.eQhvdSq9j8SUFG7fEFoGcccnTd58C7tmZsbqmQNFzdE'
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ODllMjk2OTdlNzdhNTA3ZGRkNWJhIn0sImlhdCI6MTYzNzQ3Njk1MX0.eQhvdSq9j8SUFG7fEFoGcccnTd58C7tmZsbqmQNFzdE'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log('Addin a new note');
    let note = {
      "_id": "619dab61ddd522382036c781",
      "user": "61989e29697e77a507ddd5ba",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-11-24T03:02:57.487Z",
      "__v": 0
    }
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ODllMjk2OTdlNzdhNTA3ZGRkNWJhIn0sImlhdCI6MTYzNzQ3Njk1MX0.eQhvdSq9j8SUFG7fEFoGcccnTd58C7tmZsbqmQNFzdE'
      },
    });
    const json = response.json();
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ODllMjk2OTdlNzdhNTA3ZGRkNWJhIn0sImlhdCI6MTYzNzQ3Njk1MX0.eQhvdSq9j8SUFG7fEFoGcccnTd58C7tmZsbqmQNFzdE'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;