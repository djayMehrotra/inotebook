import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NewNote from './NewNote'
import NoteItem from './NoteItem'

const Notes = () => {
  const context = useContext(noteContext)
  const { notes, getAllNotes } = context
  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    getAllNotes()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <NewNote />
      <div className="container">
        <div className="row my-3">
          <h2>Your note</h2>
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
