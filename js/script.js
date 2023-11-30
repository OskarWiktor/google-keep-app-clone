"use strict";
class OpenNote {
    constructor() {
        this.noteText = '';
        this.noteTitle = '';
        this.textInput = document.getElementById("text--input");
        this.titleInput = document.getElementById("title--input");
        this.wrapper = document.querySelector(".add-new__wrapper");
        this.closeButton = document.querySelector(".edit--button");
        this.notesList = document.getElementById("notes--list");
        if (this.textInput && this.wrapper && this.closeButton) {
            this.textInput.addEventListener("focus", this.handleInputFocus.bind(this));
            this.closeButton.addEventListener("click", this.handleClose.bind(this));
        }
    }
    handleInputFocus() {
        this.wrapper.classList.add("active");
    }
    handleClose() {
        this.noteText = this.textInput.value;
        this.noteTitle = this.titleInput.value;
        this.wrapper.classList.remove("active");
        const newNote = new Note(this.noteText, this.noteTitle);
        console.log(newNote);
        this.addNoteToList(newNote);
        this.noteText = this.textInput.value = '';
        this.noteTitle = this.titleInput.value = '';
    }
    addNoteToList(note) {
        const noteItem = document.createElement("div");
        noteItem.classList.add("note");
        noteItem.textContent = `${note.title}: ${note.text}`;
        this.notesList.appendChild(noteItem);
    }
}
class Note {
    constructor(text, title) {
        this.text = text;
        this.title = title;
    }
}
const app = new OpenNote();
