import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';


const NewNote = (props) => {
    
    const context = useContext(noteContext);
    
    const {addNote} = context;
    
    const [note, setNote] = useState({title: '', description:'', tag: 'default'})
    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: '', description:'', tag: ''});
        props.showAlert('New note created Successfully', 'success');
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
                            <input type="text" className="form-control" id="title" name="title" onChange={onChange} placeholder="Enter title here" value={note.title} minLength={5} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" id="description" name="description" onChange={onChange} placeholder="Description goes here" value={note.description} minLength={5} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} placeholder="Tag name" value={note.tag} minLength={5} required/>
                        </div>
                        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-2" onClick={handleClick}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewNote;