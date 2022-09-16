import React, { Component } from "react";
import Header from "./Header";
import NotesList from "./NotesList";

class App extends Component {
  state = {
    notes: [],
    searchText: ""
  };

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };

    // add the new note to existing notes array in state
    const NewNotes = [newNote, ...this.state.notes];
    this.setState({ notes: NewNotes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    //editMeId = the id of the note that's been edited
    // updatedKey = title or description field
    // updated value = whatever is entered in the title or description field
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  // maps over the notes array and for each note object (reads the array and returns new array with original array data)
  onSearch = (text) => {
    /* toggle the doesMatchSearch boolean value of each sticky
    note when the user types in the search field.
    set the doesMatchSearch value to true for a sticky note if
    it's title or description matches the search string. */
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        /* If the search field is empty, then
      we set the doesMatchSearch value for every note to true. */
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        // the || is "or" true
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      searchText: newSearchText,
      notes: updatedNotes
    });
  };

  deleteNote = (clickedIndex) => {
    // remove note by id of the note that the user clicks
    const newNotes = this.state.notes.filter(
      (note) => note.id !== clickedIndex
    );
    this.setState({ notes: newNotes });
  };

  // saving state to local browser
  componentDidUpdate() {
    // stringify converts state to string data type
    const stateString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stateString);
  }

  // pulling the saved value when the UI reloads
  componentDidMount() {
    const stateString = localStorage.getItem("savedNotes");
    // "if something is in the local storage, then we convert string to original"
    if (stateString) {
      // parse = converts string form to original state form
      const savedState = JSON.parse(stateString);
      this.setState({ notes: savedState });
    }
  }

  render() {
    return (
      <div>
        {/* have to pass the function to the different components for them to work */}
        <Header
          onSearch={this.onSearch}
          searchText={this.state.searchText}
          addNote={this.addNote}
        />
        <NotesList
          onType={this.onType}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default App;
