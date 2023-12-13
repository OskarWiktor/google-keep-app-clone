"use strict";
class OpenNote {
    constructor() {
        this.textInput = document.getElementById("text--input");
        this.titleInput = document.getElementById("title--input");
        this.wrapper = document.querySelector(".add-new__wrapper");
        this.closeButton = document.querySelector(".edit--button");
        this.noteText = "";
        this.noteTitle = "";
        this.notesList = document.getElementById("notes--list");
        this.notesWrapper = document.getElementById("notes__wrapper");
        this.textInput.addEventListener("focus", this.handleInputFocus.bind(this));
        this.closeButton.addEventListener("click", this.handleClose.bind(this));
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
const openNote = new OpenNote();
class Search {
    constructor() {
        this.searchInput = document.getElementById("search--input");
        this.searchWrapper = document.querySelector(".navbar--search__wrapper");
        this.searchIconWrapper = document.getElementById("search--icon__wrapper");
        this.searchCrossIconWrapper = document.getElementById("search--icon-cross__wrapper");
        this.navbarMenu = document.getElementById("navbar--menu");
        this.navbarLogo = document.getElementById("navbar--logo");
        this.searchInput.addEventListener("focus", this.handleSearchInputFocus.bind(this));
        this.searchCrossIconWrapper.addEventListener("click", this.handleSearchCrossIcon.bind(this));
        this.searchIconWrapper.addEventListener("click", this.handleSearchInputFocus.bind(this));
    }
    handleSearchInputFocus() {
        this.searchWrapper.classList.add("active");
        this.navbarMenu.classList.add("search-active");
        this.navbarLogo.classList.add("search-active");
    }
    handleSearchCrossIcon() {
        this.searchWrapper.classList.remove("active");
        this.navbarMenu.classList.remove("search-active");
        this.navbarLogo.classList.remove("search-active");
    }
}
const search = new Search();
