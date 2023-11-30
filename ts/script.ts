class OpenNote {
  protected textInput: HTMLInputElement;
  protected titleInput: HTMLInputElement;

  protected wrapper: HTMLElement;
  protected closeButton: HTMLButtonElement;

  protected noteText: string | number = '';
  protected noteTitle: string | number = ''

  protected notesList: HTMLElement;

  constructor() {
    this.textInput = document.getElementById("text--input") as HTMLInputElement;
    this.titleInput = document.getElementById("title--input") as HTMLInputElement;
    this.wrapper = document.querySelector(".add-new__wrapper") as HTMLElement;
    this.closeButton = document.querySelector(".edit--button") as HTMLButtonElement;
    this.notesList = document.getElementById("notes--list") as HTMLElement;

    if (this.textInput && this.wrapper && this.closeButton) {
      this.textInput.addEventListener(
        "focus",
        this.handleInputFocus.bind(this)
      );
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
  
  addNoteToList(note: Note) {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note")
    noteItem.textContent = `${note.title}: ${note.text}`;
    this.notesList.appendChild(noteItem);
  }
}

class Note {
  constructor(public text: string | number, public title: string | number) {}
}

const app = new OpenNote();
