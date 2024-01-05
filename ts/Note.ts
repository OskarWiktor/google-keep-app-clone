type NoteType = string | number | null;

class OpenNote {
  protected textInput: HTMLInputElement = document.getElementById(
    "text--input"
  ) as HTMLInputElement;
  protected titleInput: HTMLInputElement = document.getElementById(
    "title--input"
  ) as HTMLInputElement;

  protected AddNewWrapper: HTMLElement = document.querySelector(
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
  protected note = document.querySelectorAll(".note");

  protected changeBackgroundColorIcon: HTMLElement = document.getElementById(
    "add--background"
  ) as HTMLElement;
  protected changeBackgroundColorEditWrapper: HTMLElement =
    document.querySelector(".add--background__wrapper") as HTMLElement;
  protected AddNewBackgroundColor = "white";
  protected activeColor: Node | null = null;
  protected activePattern: Node | null = null;

  constructor() {
    this.textInput.addEventListener("focus", this.handleInputFocus.bind(this));
    this.closeButton.addEventListener("click", this.handleClose.bind(this));
    document.addEventListener("click", this.handleDocumentClick.bind(this));

    this.changeBackgroundColorIcon.addEventListener(
      "click",
      this.handleAddBackgroundColor.bind(this)
    );
  }

  handleInputFocus() {
    this.AddNewWrapper.classList.add("active");
    this.notesWrapper.style.marginTop = "196px";
  }

  handleClose() {
    this.noteText = this.textInput.value;
    this.noteTitle = this.titleInput.value;

    this.AddNewWrapper.classList.remove("active");
    this.notesWrapper.style.marginTop = "106px";

    if (this.noteText || this.noteTitle) {
      const newNote = new Note(this.noteText, this.noteTitle);
      this.addNoteToList(newNote);
    }
    this.noteText = this.textInput.value = "";
    this.noteTitle = this.titleInput.value = "";
    this.changeBackgroundColorEditWrapper.classList.remove("active");

    this.textInput.style.backgroundColor = "white";
    this.titleInput.style.backgroundColor = "white";
    this.AddNewWrapper.style.backgroundColor = "white";
  }

  handleDocumentClick(event: Event) {
    if (!this.AddNewWrapper.contains(event.target as Node)) {
      this.AddNewWrapper.classList.remove("active");
      this.notesWrapper.style.marginTop = "106px";

      this.noteText = this.textInput.value;
      this.noteTitle = this.titleInput.value;

      if (this.noteText || this.noteTitle) {
        const newNote = new Note(this.noteText, this.noteTitle);
        this.addNoteToList(newNote);
      }
      this.noteText = this.textInput.value = "";
      this.noteTitle = this.titleInput.value = "";
      this.changeBackgroundColorEditWrapper.classList.remove("active");

      this.textInput.style.backgroundColor = "white";
      this.titleInput.style.backgroundColor = "white";
      this.AddNewWrapper.style.backgroundColor = "white";
    }
  }

  handleAddBackgroundColor() {
    this.changeBackgroundColorEditWrapper.classList.toggle("active");
    const colorEditDiv = document.querySelectorAll(".background--color");
    const patternEditDiv = document.querySelectorAll(".background--pattern");

    colorEditDiv.forEach((colorEditDiv) => {
      colorEditDiv.addEventListener("click", () => {
        this.AddNewBackgroundColor =
          window.getComputedStyle(colorEditDiv).backgroundColor;

        this.AddNewWrapper.style.backgroundColor = this.AddNewBackgroundColor;
        this.textInput.style.backgroundColor = this.AddNewBackgroundColor;
        this.titleInput.style.backgroundColor = this.AddNewBackgroundColor;
        if (this.activeColor instanceof HTMLElement) {
          this.activeColor.classList.remove("active");
        }

        colorEditDiv.classList.add("active");
        this.activeColor = colorEditDiv;
      });
    });
    patternEditDiv.forEach((patternEditDiv) => {
      patternEditDiv.addEventListener("click", () => {
        if (this.activePattern instanceof HTMLElement) {
          this.activePattern.classList.remove("active");
        }
        patternEditDiv.classList.add("active");
        this.activePattern = patternEditDiv;
      });
    });
  }

  addNoteToList(note: Note) {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note");
    noteItem.style.backgroundColor = window.getComputedStyle(
      this.AddNewWrapper
    ).backgroundColor;
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
  constructor(public text: string, public title: string) {}
}

const openNote = new OpenNote();
