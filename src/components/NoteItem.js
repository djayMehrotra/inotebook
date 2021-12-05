import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;

    const {note, updateNote} = props;
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3" style={{width: "18rem"}}>
                    <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className='d-flex justify-content-between'>
                        <span className="badge rounded-pill bg-primary p-2">{`#${note.tag}`}</span>
                        <span>
                            <i className="fas fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert('Notes deleted Successfully', 'success');}}></i>
                            <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                        </span>
                    </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem

/* task to do
     - try catch
     - remove consoles
*/