import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NewNote from './NewNote'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext)
  const { notes, getAllNotes, editNote } = context
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('token') ? getAllNotes() : navigate('/login');
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: '', eTitle: '', eDescription: '', eTag: '' })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      eTitle: currentNote.title,
      eDescription: currentNote.description,
      eTag: currentNote.tag,
    });
  }

  const handleClick = () => {
    console.log(`updating the note`)
    refClose.current.click();
    //addNote(note.title, note.description, note.tag);
    editNote(note.id, note.eTitle, note.eDescription, note.eTag);
    props.showAlert('Notes updated Successfully', 'success');
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <NewNote showAlert={props.showAlert} />

      <div className="container">
        <div className="row my-3">
          <h2>Your note</h2>
          {notes.length === 0 && <div className='container'>{`No notes to display`}</div>}  
          {notes.map((note) => {
            return (
              <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
            )
          })}
        </div>
      </div>
      {/* modal begins */}
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="eTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTitle"
                    name="eTitle"
                    onChange={onChange}
                    placeholder="Enter title here"
                    value={note.eTitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eDescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eDescription"
                    name="eDescription"
                    onChange={onChange}
                    placeholder="Description goes here"
                    value={note.eDescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eTag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTag"
                    name="eTag"
                    onChange={onChange}
                    placeholder="Tag name"
                    value={note.eTag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                disabled={note.eTitle.length<5 || note.eDescription.length<5}
              >
                Edit changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* /modal ends */}
    </>
  )
}

export default Notes
