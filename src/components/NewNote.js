import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';


const NewNote = () => {
    
    const context = useContext(noteContext);
    
    const {addNote} = context;
    
    const [note, setNote] = useState({title: '', description:'', tag: 'General'})
    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }
    

    return (
        <div>
            <div className="container my-3">
                <h1>Add your note</h1>
                <div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" name="title" onChange={onChange} placeholder="Enter title here" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" id="description" name="description" onChange={onChange} placeholder="Description goes here" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} placeholder="Tag name" />
                        </div>
                        <button type="submit" className="btn btn-primary my-2" onClick={handleClick}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewNote;