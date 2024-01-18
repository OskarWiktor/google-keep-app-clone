"use strict";
//import firebase from "firebase/compat/app";
class Login {
    //protected auth = firebase.auth();
    //protected provider = new firebase.auth.GoogleAuthProvider();
    constructor() {
        this.loginWrapper = document.getElementById("login-wrapper");
        this.loginOpen = document.getElementById("login-open");
        this.loginCloseIcon = document.getElementById("login-close");
        this.signInButton = document.getElementById("sign-in");
        this.signOutButton = document.getElementById("sign-out");
        this.loginOpen.addEventListener("click", this.handleLoginOpen.bind(this));
        this.loginCloseIcon.addEventListener("click", this.handleLoginClose.bind(this));
        document.addEventListener("click", this.handleDocumentLoginClose.bind(this));
        this.signInButton.addEventListener("click", this.handleSignIn.bind(this));
    }
    handleLoginOpen() {
        this.loginWrapper.classList.toggle("active");
    }
    handleLoginClose() {
        this.loginWrapper.classList.remove("active");
    }
    handleDocumentLoginClose(event) {
        if (!this.loginWrapper.contains(event.target) &&
            !this.loginOpen.contains(event.target)) {
            this.handleLoginClose();
        }
    }
    handleSignIn() {
        //    this.auth.signInWithPopup(this.provider)
    }
}
const login = new Login();
class OpenNote {
    constructor() {
        this.textInput = document.getElementById("text--input");
        this.titleInput = document.getElementById("title--input");
        this.addNewWrapper = document.querySelector(".add-new__wrapper");
        this.addNewPatternWrapper = document.querySelector(".add-new__pattern-wrapper");
        this.closeButton = document.querySelector(".edit--button");
        this.noteText = "";
        this.noteTitle = "";
        this.notesList = document.getElementById("notes--list");
        this.notesWrapper = document.getElementById("notes__wrapper");
        this.note = document.querySelectorAll(".note");
        this.noteImgInput = document.querySelector(".file-input");
        this.noteImg = document.querySelector(".add-new--image");
        this.changeBackgroundColorIcon = document.getElementById("add--background");
        this.changeBackgroundColorEditWrapper = document.querySelector(".add--background__wrapper");
        this.defaultColor = document.getElementById("color--none");
        this.colorEditDivs = document.querySelectorAll(".background--color");
        this.addNewBackgroundColor = "white";
        this.defaultPatter = document.getElementById("pattern--none");
        this.patternEditDivs = document.querySelectorAll(".background--pattern");
        this.addNewBackgroundPattern = "";
        this.textInput.addEventListener("focus", this.handleInputFocus.bind(this));
        this.closeButton.addEventListener("click", this.handleNoteClose.bind(this));
        document.addEventListener("click", this.handleDocumentClick.bind(this));
        this.changeBackgroundColorIcon.addEventListener("click", this.handleAddBackgroundColor.bind(this));
        this.noteImgInput.addEventListener("change", this.handleAddImg.bind(this));
    }
    handleInputFocus() {
        this.addNewWrapper.classList.add("active");
        let addNewWrapperHeight = parseFloat(window.getComputedStyle(this.addNewWrapper).height);
        this.notesWrapper.style.marginTop = 106 + addNewWrapperHeight - 48 + "px";
        this.noteImg.src = "";
    }
    closeAddNewNote() {
        this.noteText = this.textInput.textContent
            ? this.textInput.textContent
            : "";
        this.noteTitle = this.titleInput.textContent
            ? this.titleInput.textContent
            : "";
        this.addNewWrapper.classList.remove("active");
        this.notesWrapper.style.marginTop = "106px";
        if (this.noteText || this.noteTitle) {
            const newNote = new Note(this.noteText, this.noteTitle);
            this.addNoteToList(newNote);
        }
        this.textInput.textContent = "";
        this.titleInput.textContent = "";
        this.textInput.style.backgroundColor = "transparent";
        this.titleInput.style.backgroundColor = "transparent";
        this.addNewWrapper.style.backgroundColor = "white";
        this.addNewPatternWrapper.style.backgroundImage = "";
        this.colorEditDivs.forEach((colorEditDiv) => colorEditDiv.classList.remove("active"));
        this.patternEditDivs.forEach((patternEditDiv) => patternEditDiv.classList.remove("active"));
        this.defaultColor.classList.add("active");
        this.defaultPatter.classList.add("active");
        this.changeBackgroundColorEditWrapper.classList.remove("active");
        this.noteImg.src = "";
    }
    handleNoteClose() {
        this.closeAddNewNote();
    }
    handleAddBackgroundClose() {
        this.changeBackgroundColorEditWrapper.classList.remove("active");
    }
    handleDocumentClick(event) {
        if (!this.addNewWrapper.contains(event.target)) {
            this.closeAddNewNote();
        }
        if (!this.changeBackgroundColorEditWrapper.contains(event.target) &&
            !this.changeBackgroundColorIcon.contains(event.target)) {
            this.handleAddBackgroundClose();
        }
    }
    handleAddImg(event) {
        this.noteImg.src = URL.createObjectURL(event.target.files[0]);
        console.log("add");
    }
    handleAddBackgroundColor() {
        this.changeBackgroundColorEditWrapper.classList.toggle("active");
        this.colorEditDivs.forEach((colorEditDiv) => {
            colorEditDiv.addEventListener("click", () => {
                this.colorEditDivs.forEach((colorEditDiv) => colorEditDiv.classList.remove("active"));
                this.addNewBackgroundColor =
                    window.getComputedStyle(colorEditDiv).backgroundColor;
                this.addNewWrapper.style.backgroundColor = this.addNewBackgroundColor;
                colorEditDiv.classList.add("active");
            });
        });
        this.patternEditDivs.forEach((patternEditDiv) => {
            patternEditDiv.addEventListener("click", () => {
                this.patternEditDivs.forEach((patternEditDiv) => patternEditDiv.classList.remove("active"));
                this.addNewBackgroundPattern =
                    window.getComputedStyle(patternEditDiv).backgroundImage;
                this.addNewPatternWrapper.style.backgroundImage =
                    this.addNewBackgroundPattern;
                patternEditDiv.classList.add("active");
            });
        });
    }
    addNoteToList(note) {
        const noteItem = document.createElement("div");
        noteItem.classList.add("note");
        noteItem.style.backgroundColor = window.getComputedStyle(this.addNewWrapper).backgroundColor;
        noteItem.style.backgroundImage = window.getComputedStyle(this.addNewPatternWrapper).backgroundImage;
        if (this.noteImg.src.includes("blob")) {
            noteItem.style.backgroundImage = `url('${this.noteImg.src}')`;
            console.log(this.noteImg.src);
        }
        this.notesList.appendChild(noteItem);
        const noteTitle = document.createElement("h3");
        noteTitle.classList.add("note--title");
        noteTitle.textContent = note.title;
        noteItem.appendChild(noteTitle);
        const noteText = document.createElement("p");
        noteText.classList.add("note--text");
        noteText.textContent = note.text;
        noteItem.appendChild(noteText);
        const noteCheckIconWrapper = document.createElement("div");
        noteCheckIconWrapper.classList.add("note--check-icon__wrapper");
        noteItem.appendChild(noteCheckIconWrapper);
        const noteCheckIcon = document.createElement("span");
        noteCheckIcon.classList.add("material-symbols-outlined");
        noteCheckIcon.textContent = " check_circle ";
        noteCheckIconWrapper.appendChild(noteCheckIcon);
        const noteCheckIconTooltip = document.createElement("span");
        noteCheckIconTooltip.classList.add("tooltip--text");
        noteCheckIconTooltip.textContent = "Zaznacz notatkę";
        noteCheckIconWrapper.appendChild(noteCheckIconTooltip);
        const notePushPinWrapper = document.createElement("div");
        notePushPinWrapper.classList.add("note--pin-icon__wrapper");
        noteItem.appendChild(notePushPinWrapper);
        const notePushPin = document.createElement("span");
        notePushPin.classList.add("material-symbols-outlined");
        notePushPin.textContent = " push_pin ";
        notePushPinWrapper.appendChild(notePushPin);
        const notePushPinTooltip = document.createElement("span");
        notePushPinTooltip.classList.add("tooltip--text");
        notePushPinTooltip.textContent = "Przypnij notatkę";
        notePushPinWrapper.appendChild(notePushPinTooltip);
        const noteIconList = document.createElement("div");
        noteIconList.classList.add("note--icons-list__wrapper");
        noteItem.appendChild(noteIconList);
        const noteIconReminderWrapper = document.createElement("div");
        noteIconReminderWrapper.classList.add("note--icons__wrapper");
        noteIconList.appendChild(noteIconReminderWrapper);
        const noteIconReminder = document.createElement("span");
        noteIconReminder.classList.add("material-symbols-outlined");
        noteIconReminder.textContent = " add_alert ";
        noteIconReminderWrapper.appendChild(noteIconReminder);
        const noteIconReminderTooltip = document.createElement("span");
        noteIconReminderTooltip.classList.add("tooltip--text");
        noteIconReminderTooltip.textContent = "Przypomnij mi";
        noteIconReminderWrapper.appendChild(noteIconReminderTooltip);
        const noteIconAddPersonWrapper = document.createElement("div");
        noteIconAddPersonWrapper.classList.add("note--icons__wrapper");
        noteIconList.appendChild(noteIconAddPersonWrapper);
        const noteIconAddPerson = document.createElement("span");
        noteIconAddPerson.classList.add("material-symbols-outlined");
        noteIconAddPerson.textContent = " person_add ";
        noteIconAddPersonWrapper.appendChild(noteIconAddPerson);
        const noteIconAddPersonTooltip = document.createElement("span");
        noteIconAddPersonTooltip.classList.add("tooltip--text");
        noteIconAddPersonTooltip.textContent = "Współpracownik";
        noteIconAddPersonWrapper.appendChild(noteIconAddPersonTooltip);
        const noteIconAddPaletteWrapper = document.createElement("div");
        noteIconAddPaletteWrapper.classList.add("note--icons__wrapper");
        noteIconList.appendChild(noteIconAddPaletteWrapper);
        const noteIconAddPalette = document.createElement("span");
        noteIconAddPalette.classList.add("material-symbols-outlined");
        noteIconAddPalette.textContent = " palette ";
        noteIconAddPaletteWrapper.appendChild(noteIconAddPalette);
        const noteIconAddPaletteTooltip = document.createElement("span");
        noteIconAddPaletteTooltip.classList.add("tooltip--text");
        noteIconAddPaletteTooltip.textContent = "Opcje tła";
        noteIconAddPaletteWrapper.appendChild(noteIconAddPaletteTooltip);
        const noteIconImageWrapper = document.createElement("div");
        noteIconImageWrapper.classList.add("note--icons__wrapper");
        noteIconList.appendChild(noteIconImageWrapper);
        const noteIconImage = document.createElement("span");
        noteIconImage.classList.add("material-symbols-outlined");
        noteIconImage.textContent = " image ";
        noteIconImageWrapper.appendChild(noteIconImage);
        const noteIconImageTooltip = document.createElement("span");
        noteIconImageTooltip.classList.add("tooltip--text");
        noteIconImageTooltip.textContent = "Dodaj obraz";
        noteIconImageWrapper.appendChild(noteIconImageTooltip);
        const noteIconArchiveWrapper = document.createElement("div");
        noteIconArchiveWrapper.classList.add("note--icons__wrapper");
        noteIconList.appendChild(noteIconArchiveWrapper);
        const noteIconArchive = document.createElement("span");
        noteIconArchive.classList.add("material-symbols-outlined");
        noteIconArchive.textContent = " archive ";
        noteIconArchiveWrapper.appendChild(noteIconArchive);
        const noteIconArchiveTooltip = document.createElement("span");
        noteIconArchiveTooltip.classList.add("tooltip--text");
        noteIconArchiveTooltip.textContent = "Archiwizuj";
        noteIconArchiveWrapper.appendChild(noteIconArchiveTooltip);
        const noteIconMoreWrapper = document.createElement("div");
        noteIconMoreWrapper.classList.add("note--icons__wrapper");
        noteIconList.appendChild(noteIconMoreWrapper);
        const noteIconMore = document.createElement("span");
        noteIconMore.classList.add("material-symbols-outlined");
        noteIconMore.textContent = " more_vert ";
        noteIconMoreWrapper.appendChild(noteIconMore);
        const noteIconMoreTooltip = document.createElement("span");
        noteIconMoreTooltip.classList.add("tooltip--text");
        noteIconMoreTooltip.textContent = "Więcej";
        noteIconMoreWrapper.appendChild(noteIconMoreTooltip);
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
        this.searchInput.addEventListener("focus", this.handleSearchInputActive.bind(this));
        this.searchIconWrapper.addEventListener("click", this.handleSearchInputActive.bind(this));
        this.searchCrossIconWrapper.addEventListener("click", this.handleSearchCrossIcon.bind(this));
        document.addEventListener("click", this.handleDocumentClick.bind(this));
    }
    handleSearchInputActive() {
        this.searchWrapper.classList.add("active");
        this.navbarMenu.classList.add("search-active");
        this.navbarLogo.classList.add("search-active");
    }
    handleSearchCrossIcon() {
        this.searchWrapper.classList.remove("active");
        this.navbarMenu.classList.remove("search-active");
        this.navbarLogo.classList.remove("search-active");
    }
    handleDocumentClick(event) {
        if (!this.searchWrapper.contains(event.target)) {
            this.searchWrapper.classList.remove("active");
            this.navbarMenu.classList.remove("search-active");
            this.navbarLogo.classList.remove("search-active");
        }
    }
}
const search = new Search();
