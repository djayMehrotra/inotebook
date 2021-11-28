import { useState } from "react";
import NoteContext from "./noteContext";

const noteInitial = [
    {
      "_id": "61993aecf1cf484bbab756bf",
      "user": "61989e29697e77a507ddd5ba",
      "title": "Youtube Data",
      "description": "Please wake up early",
      "tag": "videocafe2",
      "date": "2021-11-20T18:14:04.753Z",
      "__v": 0
    },
    {
      "_id": "61993b17f1cf484bbab756c1",
      "user": "61989e29697e77a507ddd5ba",
      "title": "My title",
      "description": "Please wake up early",
      "tag": "General",
      "date": "2021-11-20T18:14:47.157Z",
      "__v": 0
    },
    {
      "_id": "6199d7102ededfe9ea2b2783",
      "user": "61989e29697e77a507ddd5ba",
      "title": "Youtubeer hun mai",
      "description": "Please access playlist",
      "tag": "metacafe",
      "date": "2021-11-21T05:20:16.492Z",
      "__v": 0
    },
    {
      "_id": "619dab61ddd522382036c781",
      "user": "61989e29697e77a507ddd5ba",
      "title": "CWH react",
      "description": "Learning react via youtube",
      "tag": "Coding",
      "date": "2021-11-24T03:02:57.487Z",
      "__v": 0
    }
  ]

const NoteState = ( props )=>{  
    /* const s1 = {
        "name": "Harry",
        "class": "5b"
    }
    const [state, setState] = useState(s1) 
    
    const update = () =>{
        setTimeout(() => {
            setState({"name": "Rudved", "class" : "10c"})
        }, 1000);
    } */

    const [notes, setNotes] = useState(noteInitial);

    //Add a note
    const addNote = (title, description, tag)=>{
      //TODO API CALLL
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
      /* notes.push(note)
      setNotes(notes); */

      setNotes(notes.concat(note));


    }

    //Delete a note
    const deleteNote =(id)=>{
      //TODO API CALLL
      console.log(`deleting a note` + id);
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote}}>
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState;