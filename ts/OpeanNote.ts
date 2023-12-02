type NoteType = string | number | null;

class OpenNote {
  protected textInput: HTMLInputElement = document.getElementById(
    "text--input"
  ) as HTMLInputElement;
  protected titleInput: HTMLInputElement = document.getElementById(
    "title--input"
  ) as HTMLInputElement;

  protected wrapper: HTMLElement = document.querySelector(
    ".add-new__wrapper"
  ) as HTMLElement;
  protected closeButton: HTMLButtonElement = document.querySelector(
    ".edit--button"
  ) as HTMLButtonElement;

  protected noteText: NoteType = "";
  protected noteTitle: NoteType = "";

  protected notesList: HTMLElement = document.getElementById(
    "notes--list"
  ) as HTMLElement;
  protected notesWrapper: HTMLElement = document.getElementById(
    "notes__wrapper"
  ) as HTMLElement;

  constructor() {
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

  addNoteToList(note: Note) {
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
  constructor(public text: string, public title: string) {}
}

const openNote = new OpenNote();
