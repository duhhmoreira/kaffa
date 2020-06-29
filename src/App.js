import React, { Component } from "react";
import "./App.css";

import Button from '@material-ui/core/Button';
import { TextField } from "@material-ui/core";

class App extends Component {
  state = {
    notes: [],
    currentNote: "",
    noteEditing: null,
    currentEdit: "",
    clock:"",
  };

  componentDidMount() {
    const json = localStorage.getItem("notes");
    const notes = JSON.parse(json);
    if (notes) {
      this.setState(() => ({ notes }));
    }

    fetch('http://worldclockapi.com/api/json/utc/now')
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      this.setState({ clock: JSON.stringify(data)})
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.notes.forEach((note, index) => {
      if (prevState.notes[index] !== note) {
        const json = JSON.stringify(this.state.notes);
        localStorage.setItem("notes", json);
      }
    });
  }

  setNoteEditing = index => {
    this.setState({ noteEditing: index, currentEdit: this.state.notes[index] });
  };
  
  editItem = event => {
    this.setState({ currentEdit: event.target.value });
  };
  
  submitEdit = index => {
    let notes = [...this.state.notes];
    notes[index] = this.state.currentEdit;
    this.setState({ notes, noteEditing: null });
  };
  
  addItem = () => {
    let notes = [...this.state.notes];
    notes.push(this.state.currentNote);
    this.setState({ notes, currentNote: "" });
  };

  deleteItem = indexToDelete => {
    let notes = [...this.state.notes].filter(
      (note, index) => index !== indexToDelete
    );
    this.setState({ notes });
  };

  render() {
    return (
      <div className="App">
      
         <h1>Kaffa Test</h1>
         <TextField id="standard-basic" label="Item" 
          onChange={event => this.setState({ currentNote: event.target.value })}
          value={this.state.currentNote}
          className="input"/>
         <Button variant="contained" color="primary"onClick={this.addItem}>
         Adicionar Item
        </Button>
        {this.state.notes.map((note, index) => (
        <div className="notes" key={index}>
          {this.state.noteEditing === null ||
          this.state.noteEditing !== index ? (
            <div className="note">
              <div className="note-content">
                <div className="note-text">{note}</div>
                <Button color="primary" onClick={() => this.setNoteEditing(index)}>Editar</Button>
              </div>

            <Button color="secondary" onClick={() => this.deleteItem(index)}>Deletar</Button>  
            </div>
          ) : (
            <div className="note">
              <div className="note-content">
                <input
                type="text"
                value={this.state.currentEdit}
                  onChange={event => this.editItem(event)}
                />

                <Button color="primary" onClick={() => this.submitEdit(index)}>Ok</Button>
               
              </div>
              <Button color="secondary" onClick={() => this.deleteItem(index)}>Deletar</Button>  
            </div>
          )}
        </div>
        ))}
        <h1>Return API  World Clock</h1>
        <p>{this.state.clock}</p>
        </div>
    );
  }
}

export default App;
