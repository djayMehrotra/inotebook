import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import NewNote from './NewNote';
import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;
    return (
        <>
            <NewNote />
            <div className="row my-3">
                <h2>Your note</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;
