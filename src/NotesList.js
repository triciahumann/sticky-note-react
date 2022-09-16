import React from "react";
import Note from "./Note";

const NotesList = (props) => {
  const keepSearchMatches = (note) => note.doesMatchSearch;
  const searchMatches = props.notes.filter(keepSearchMatches);

  const renderNote = (note) => (
    <Note
      onType={props.onType}
      note={note}
      key={note.id}
      deleteNote={props.deleteNote}
    />
  );

  const notesElements = searchMatches.map(renderNote);
  return <ul className="notes-list">{notesElements}</ul>;
};

export default NotesList;
