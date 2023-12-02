"use strict";
class OpenNote {
    constructor() {
        this.noteText = "";
        this.noteTitle = "";
        this.textInput = document.getElementById("text--input");
        this.titleInput = document.getElementById("title--input");
        this.wrapper = document.querySelector(".add-new__wrapper");
        this.closeButton = document.querySelector(".edit--button");
        this.notesList = document.getElementById("notes--list");
        this.notesWrapper = document.getElementById("notes__wrapper");
        if (this.textInput && this.wrapper && this.closeButton) {
            this.textInput.addEventListener("focus", this.handleInputFocus.bind(this));
            this.closeButton.addEventListener("click", this.handleClose.bind(this));
        }
    }
    handleInputFocus() {
        this.wrapper.classList.add("active");
        this.notesWrapper.style.marginTop = "196px";
    }
    handleClose() {
        this.noteText = this.textInput.value;
        this.noteTitle = this.titleInput.value;
        this.wrapper.classList.remove("active");
        this.notesWrapper.style.marginTop = "106px";
        if (this.noteText || this.noteTitle) {
            const newNote = new Note(this.noteText, this.noteTitle);
            this.addNoteToList(newNote);
        }
        this.noteText = this.textInput.value = "";
        this.noteTitle = this.titleInput.value = "";
    }
    addNoteToList(note) {
        const noteItem = document.createElement("div");
        noteItem.classList.add("note");
        this.notesList.appendChild(noteItem);
        const noteTitle = document.createElement("h3");
        noteTitle.classList.add("note--title");
        noteTitle.textContent = note.title;
        noteItem.appendChild(noteTitle);
        const noteText = document.createElement("p");
        noteText.classList.add("note--text");
        noteText.textContent = note.text;
        noteItem.appendChild(noteText);
    }
}
class Note {
    constructor(text, title) {
        this.text = text;
        this.title = title;
    }
}
const app = new OpenNote();