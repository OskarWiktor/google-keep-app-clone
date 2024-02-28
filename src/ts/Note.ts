type NoteType = string;

class addNote {
  protected textInput: HTMLElement = document.getElementById(
    "text--input"
  ) as HTMLElement;
  protected titleInput: HTMLElement = document.getElementById(
    "title--input"
  ) as HTMLElement;

  protected addNewWrapper: HTMLElement = document.querySelector(
    ".add-new__wrapper"
  ) as HTMLElement;
  protected addNewPatternWrapper: HTMLElement = document.querySelector(
    ".add-new__pattern-wrapper"
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

  protected noteImgInput: HTMLInputElement = document.querySelector(
    ".file-input"
  ) as HTMLInputElement;
  protected noteImg: HTMLImageElement = document.querySelector(
    ".add-new--image"
  ) as HTMLImageElement;

  protected changeBackgroundColorIcon: HTMLElement = document.getElementById(
    "add--background"
  ) as HTMLElement;
  protected changeBackgroundColorEditWrapper: HTMLElement =
    document.querySelector(".add--background__wrapper") as HTMLElement;
  protected defaultColor: HTMLElement = document.getElementById(
    "color--none"
  ) as HTMLElement;
  protected colorEditDivs = document.querySelectorAll(".background--color");
  protected addNewBackgroundColor = "white";
  protected defaultPatter: HTMLElement = document.getElementById(
    "pattern--none"
  ) as HTMLElement;
  protected patternEditDivs = document.querySelectorAll(".background--pattern");
  protected addNewBackgroundPattern = "";

  protected addMoreIcon: HTMLElement = document.getElementById(
    "add-more-icon"
  ) as HTMLElement;
  protected addMoreWrapper: HTMLElement = document.querySelector(
    ".add--more__wrapper"
  ) as HTMLElement;
  protected addTagsButton: HTMLButtonElement = document.getElementById(
    "add-tags-button"
  ) as HTMLButtonElement;
  protected addMoreButtonsWrapper: HTMLElement = document.querySelector(
    ".add--buttons__wrapper"
  ) as HTMLElement;
  protected addTagsWrapper: HTMLElement = document.querySelector(
    ".add--tags__wrapper"
  ) as HTMLElement;
  protected addTagsInput: HTMLInputElement = document.getElementById(
    "add-tags-input"
  ) as HTMLInputElement;
  protected addTagsValueWrapper: HTMLElement = document.querySelector(
    ".tag--value__wrapper"
  ) as HTMLElement;
  protected addTagsValueSpan: HTMLElement = document.querySelector(
    ".tag--value"
  ) as HTMLElement;
  protected addTagsList: HTMLElement = document.querySelector(
    ".add--tag__list"
  ) as HTMLElement;

  constructor() {
    this.textInput.addEventListener("focus", this.handleInputFocus.bind(this));
    this.closeButton.addEventListener("click", this.handleNoteClose.bind(this));
    document.addEventListener("click", this.handleDocumentClick.bind(this));

    this.changeBackgroundColorIcon.addEventListener(
      "click",
      this.handleAddBackgroundColor.bind(this)
    );
    this.noteImgInput.addEventListener("change", this.handleAddImg.bind(this));
    this.addMoreIcon.addEventListener("click", this.handleAddMore.bind(this));
  }

  handleInputFocus() {
    this.addNewWrapper.classList.add("active");
    let addNewWrapperHeight = parseFloat(
      window.getComputedStyle(this.addNewWrapper).height
    );
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
    this.colorEditDivs.forEach((colorEditDiv) =>
      colorEditDiv.classList.remove("active")
    );
    this.patternEditDivs.forEach((patternEditDiv) =>
      patternEditDiv.classList.remove("active")
    );
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

  handleDocumentClick(event: Event) {
    if (!this.addNewWrapper.contains(event.target as Node)) {
      this.closeAddNewNote();
    }
    if (
      !this.changeBackgroundColorEditWrapper.contains(event.target as Node) &&
      !this.changeBackgroundColorIcon.contains(event.target as Node)
    ) {
      this.handleAddBackgroundClose();
    }
    if (
      !this.addMoreIcon.contains(event.target as Node) &&
      !this.addMoreWrapper.contains(event.target as Node)
    ) {
      this.handleAddMoreClose();
    }
  }

  handleAddImg(event: Event) {
    if (event.target) {
      this.noteImg.src = URL.createObjectURL(event.target.files[0]);
      console.log("add");
    }
  }

  handleAddBackgroundColor() {
    this.changeBackgroundColorEditWrapper.classList.toggle("active");

    this.colorEditDivs.forEach((colorEditDiv) => {
      colorEditDiv.addEventListener("click", () => {
        this.colorEditDivs.forEach((colorEditDiv) =>
          colorEditDiv.classList.remove("active")
        );

        this.addNewBackgroundColor =
          window.getComputedStyle(colorEditDiv).backgroundColor;

        this.addNewWrapper.style.backgroundColor = this.addNewBackgroundColor;

        colorEditDiv.classList.add("active");
      });
    });

    this.patternEditDivs.forEach((patternEditDiv) => {
      patternEditDiv.addEventListener("click", () => {
        this.patternEditDivs.forEach((patternEditDiv) =>
          patternEditDiv.classList.remove("active")
        );

        this.addNewBackgroundPattern =
          window.getComputedStyle(patternEditDiv).backgroundImage;

        this.addNewPatternWrapper.style.backgroundImage =
          this.addNewBackgroundPattern;

        patternEditDiv.classList.add("active");
      });
    });
  }

  handleAddMore() {
    this.addMoreWrapper.classList.toggle("active");
    this.addTagsWrapper.style.display = "none";
    this.addMoreButtonsWrapper.style.display = "flex";
    this.addTagsButton.addEventListener("click", (e) => {

      this.addMoreButtonsWrapper.style.display = "none";
      this.addTagsWrapper.style.display = "flex";
      this.addTagsInput.addEventListener("input", (e) => {

        if (this.addTagsInput.value) {
          this.addTagsValueWrapper.style.display = "flex";
          this.addTagsValueSpan.textContent = this.addTagsInput.value;
        }
      });
      this.addTagsValueWrapper.addEventListener("click", (e) => {
        const tagWrapper = document.createElement("div");
        tagWrapper.className = "tag__wrapper";
        this.addTagsList.appendChild(tagWrapper);

        const tagCheckbox = document.createElement("span");
        tagCheckbox.textContent = " check_box_outline_blank ";
        tagCheckbox.className = "material-symbols-outlined";
        tagWrapper.appendChild(tagCheckbox);

        const tag = document.createElement("p");
        tag.textContent = this.addTagsValueSpan.textContent;
        tag.className = "tag";
        tagWrapper.appendChild(tag);
        this.addTagsInput.value = "";
        this.addTagsValueWrapper.style.display = "none";
        this.addTagsValueSpan.textContent = this.addTagsInput.value;

        tagWrapper.addEventListener("click", () => {
          tagCheckbox.classList.toggle("active");
          if (tagCheckbox.classList.contains("active")) {
            tagCheckbox.textContent = " check_box ";
          }
          if (!tagCheckbox.classList.contains("active")) {
            tagCheckbox.textContent = " check_box_outline_blank ";
          }
        });
      });
    });
  }
  handleAddMoreClose() {
    this.addMoreWrapper.classList.remove("active");
    this.addTagsWrapper.style.display = "none";
    this.addMoreButtonsWrapper.style.display = "flex";
  }

  addNoteToList(note: Note) {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note");
    noteItem.style.backgroundColor = window.getComputedStyle(
      this.addNewWrapper
    ).backgroundColor;
    noteItem.style.backgroundImage = window.getComputedStyle(
      this.addNewPatternWrapper
    ).backgroundImage;
    this.notesList.appendChild(noteItem);

    if (this.noteImg.src.includes("blob")) {
      const noteImageWrapper = document.createElement("div");
      noteImageWrapper.classList.add("note--img__wrapper");
      noteImageWrapper.style.backgroundImage = `url('${this.noteImg.src}')`;
      noteItem.appendChild(noteImageWrapper);
    }

    if (note.title) {
      const noteTitle = document.createElement("h3");
      noteTitle.classList.add("note--title");
      noteTitle.textContent = note.title;
      noteItem.appendChild(noteTitle);
    }

    if (note.text) {
      const noteText = document.createElement("p");
      noteText.classList.add("note--text");
      noteText.textContent = note.text;
      noteItem.appendChild(noteText);
    }

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

const note = new addNote();