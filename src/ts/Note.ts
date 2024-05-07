import { getDatabase, ref, push, onValue, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import Tags from "./Tags";

interface Note {
  title: string,
  text: string,
  bgcolor: string,
  bgpattern: string,
  pinned: boolean;
  tags?: string[]
}

class addNote {
  private textInput = document.getElementById( "text--input" ) as HTMLElement;
  private titleInput = document.getElementById( "title--input" ) as HTMLElement;
  private addNewWrapper = document.querySelector( ".add-new__wrapper" ) as HTMLElement;
  private addNewPatternWrapper = document.querySelector( ".add-new__pattern-wrapper" ) as HTMLElement;
  private closeButton = document.querySelector( ".edit--button" ) as HTMLButtonElement;
  private noteText: string = "";
  private noteTitle: string = "";

  private notesWrapper = document.getElementById( "notes__wrapper" ) as HTMLElement;

  private noteImgInput = document.querySelector( ".file-input" ) as HTMLInputElement;
  private noteImg = document.querySelector( ".add-new--image" ) as HTMLImageElement;

  private changeBackgroundColorIcon = document.getElementById( "add--background" ) as HTMLElement;
  private changeBackgroundColorEditWrapper = document.querySelector( ".add--background__wrapper" ) as HTMLElement;
  private colorEditDivs = document.querySelectorAll( ".background--color" );
  private patternEditDivs = document.querySelectorAll( ".background--pattern" );
  private addNewBackgroundPattern = "";
  private addNewBackgroundColor = "white";

  private addMoreIcon = document.getElementById( "add-more-icon") as HTMLElement;
  private addMoreWrapper = document.querySelector( ".add--more__wrapper" ) as HTMLElement;

  private addMoreButtonsWrapper = document.querySelector( ".add--buttons__wrapper" ) as HTMLElement;
  private addTagsWrapper = document.querySelector( ".add--tags__wrapper" ) as HTMLElement;
  
  private auth = getAuth();

  constructor() {
    this.initEvents();
  }

  private initEvents = (): void => {
    this.textInput.addEventListener( "focus", this.handleAddNewInputFocus );
    this.closeButton.addEventListener( "click", this.handleAddNewNoteClose );
    document.addEventListener( "click", this.handleDocumentClick );
    this.changeBackgroundColorIcon.addEventListener( "click", this.handleAddBackgroundColor );
    this.noteImgInput.addEventListener( "change", this.handleAddImg );
    this.addMoreIcon.addEventListener( "click", this.handleAddMore );
  }

  private handleAddNewInputFocus = (): void => {
    this.addNewWrapper.classList.add( "active" );
    let addNewWrapperHeight = parseFloat( window.getComputedStyle(this.addNewWrapper).height );
    this.notesWrapper.style.marginTop = "187px";
    this.noteImg.src = "";
  };

  private createNoteOnAddNewClose = (): void => {
    const defaultPatter = document.getElementById( "pattern--none" ) as HTMLElement;
    const defaultColor = document.getElementById( "color--none" ) as HTMLElement;

    this.noteText = this.textInput.textContent ? this.textInput.textContent : "";
    this.noteTitle = this.titleInput.textContent ? this.titleInput.textContent : "";

    this.addNewWrapper.classList.remove("active");
    this.notesWrapper.style.marginTop = "106px";

    if (this.noteText || this.noteTitle) {
      const newNote = new NoteClass(
        this.noteText, 
        this.noteTitle, 
        this.addNewBackgroundColor, 
        this.addNewBackgroundPattern,
        Tags.getActiveTags()
        );
      this.createNewNote(newNote);
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
    defaultColor.classList.add("active");
    defaultPatter.classList.add("active");
    this.changeBackgroundColorEditWrapper.classList.remove("active");
    this.noteImg.src = "";
    this.addNewBackgroundColor = "white";
    this.addNewBackgroundPattern = "";
  };

  private handleAddNewNoteClose = (): void => {
    this.createNoteOnAddNewClose();
  };

  private handleAddBackgroundClose = (): void => {
    this.changeBackgroundColorEditWrapper.classList.remove("active");
  };

  private handleDocumentClick = (event: Event): void => {
    if (!this.addNewWrapper.contains(event.target as Node)) {
      this.createNoteOnAddNewClose();
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
  };

  private handleAddImg = (event: Event): void => {
    const imgInput = event.target as HTMLInputElement;
    if (imgInput && imgInput.files && imgInput.files.length > 0) {
      this.noteImg.src = URL.createObjectURL(imgInput.files[0]);
    }
  };

  private handleAddBackgroundColor = (): void => {
    this.changeBackgroundColorEditWrapper.classList.toggle("active");

    this.colorEditDivs.forEach((colorEditDiv) => {
      colorEditDiv.addEventListener("click", () => {
        this.colorEditDivs.forEach((colorEditDiv) =>
          colorEditDiv.classList.remove("active")
        );

        this.addNewBackgroundColor = window.getComputedStyle(colorEditDiv).backgroundColor;
        this.addNewWrapper.style.backgroundColor = this.addNewBackgroundColor; 
        colorEditDiv.classList.add("active");
      });
    });

    this.patternEditDivs.forEach((patternEditDiv) => {
      patternEditDiv.addEventListener("click", () => {
        this.patternEditDivs.forEach((patternEditDiv) =>
          patternEditDiv.classList.remove("active")
        );

        this.addNewBackgroundPattern = window.getComputedStyle(patternEditDiv).backgroundImage;
        this.addNewPatternWrapper.style.backgroundImage = this.addNewBackgroundPattern;
        patternEditDiv.classList.add("active");
      });
    });
  };

  private handleAddMore = (): void => {
    const addTagsButton = document.getElementById( "add-tags-button" ) as HTMLButtonElement;
    const addTagsInput = document.getElementById( "add-tags-input" ) as HTMLInputElement;
    const addTagsValueWrapper = document.querySelector( ".tag--value__wrapper" ) as HTMLElement;
    const addTagsValueSpan = document.querySelector( ".tag--value" ) as HTMLElement;

    this.addMoreWrapper.classList.toggle("active");
    this.addTagsWrapper.style.display = "none";
    this.addMoreButtonsWrapper.style.display = "flex";
    addTagsButton.addEventListener("click", (e) => {
      this.addMoreButtonsWrapper.style.display = "none";
      this.addTagsWrapper.style.display = "flex";
      addTagsInput.addEventListener("input", (e) => {
        if (addTagsInput.value) {
          addTagsValueWrapper.style.display = "flex";
          addTagsValueSpan.textContent = addTagsInput.value;
        }
      });
      Tags.createTags()
    });
  };

  private handleAddMoreClose = (): void => {
    this.addMoreWrapper.classList.remove("active");
    this.addTagsWrapper.style.display = "none";
    this.addMoreButtonsWrapper.style.display = "flex";
  };

  private createIconWithTooltip = ( iconName: string, iconTooltipText: string): HTMLElement => {
    const iconWrapper = document.createElement("div");
    iconWrapper.classList.add("note--icons__wrapper");

    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined");
    icon.textContent = iconName;
    iconWrapper.appendChild(icon);

    const iconTooltip = document.createElement("span");
    iconTooltip.classList.add("tooltip--text");
    iconTooltip.textContent = iconTooltipText;
    iconWrapper.appendChild(iconTooltip);

    return iconWrapper;
  };

  private createNewNote = (note: Note): void => {
    const notesList: HTMLElement = document.getElementById( "notes--list" ) as HTMLElement;
    const noteItem = document.createElement("div");

    noteItem.classList.add("note");
    noteItem.style.backgroundColor = this.addNewBackgroundColor;
    if (note.bgcolor) {
      noteItem.style.backgroundColor = note.bgcolor;
    }
    noteItem.style.backgroundImage = this.addNewBackgroundPattern;
    if (note.bgpattern) {
      noteItem.style.backgroundImage = note.bgpattern;
    }
    notesList.prepend(noteItem);

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

    const icons = [
      {iconName: " add_alert ", iconTooltipText: "Przypomnij mi"},
      {iconName: " person_add ", iconTooltipText: "Współpracownik"},
      {iconName: " palette ", iconTooltipText: "Opcje tła"},
      {iconName: " image ", iconTooltipText: "Dodaj obraz"},
      {iconName: " archive ", iconTooltipText: "Archiwizuj"},
      {iconName: " more_vert ", iconTooltipText: "Więcej"},
    ];

    const noteIconList = document.createElement("div");
    noteIconList.classList.add("note--icons-list__wrapper");
    noteItem.appendChild(noteIconList);

    icons.forEach((iconInfo) => {
      const icon = this.createIconWithTooltip(
        iconInfo.iconName,
        iconInfo.iconTooltipText
      );
      noteIconList.appendChild(icon);
    });
    this.createNewNoteInDatabase(note);
    this.addNewBackgroundColor = "white";
    this.addNewBackgroundPattern = "";
  };

  private createNewNoteInDatabase = (note: Note): void => {
    const db = getDatabase();
    const userId = this.auth.currentUser?.uid;
    const notesRef = ref(db, `users/${userId}/notes/`);

    const { 
      title, 
      text, 
      bgcolor, 
      bgpattern,
      pinned,
      tags,
    } = note;
    
    const noteDate: Note = { 
      title, 
      text, 
      bgcolor, 
      bgpattern,
      pinned,
      tags,
    }

    push(notesRef, noteDate);
  }

  public fetchNotesFromDatabese = async (): Promise<void> => {
    try {
      const db = getDatabase();
      const userId = this.auth.currentUser?.uid;
      const notesRef = ref(db, `users/${userId}/notes/`);
  
      const snapshot = await get(notesRef);
      const notesData = snapshot.val();

      if(notesData) {
        const notes: Note[] = Object.values(notesData);
        notes.forEach((note: Note) => { 
          console.log(note)
          this.createNoteFromDatabase(note)
        })
      } else {
        console.log("Ten użytkownik nie posiada żadnych notatek")
      }
    }
    catch (error) {
      console.log(`Błąd pobierania notatek z bazy danych: ${error}`)
    }
  }

  private createNoteFromDatabase = (note: Note): void => {
    const notesList: HTMLElement = document.getElementById( "notes--list" ) as HTMLElement;
    const noteItem = document.createElement("div");

    noteItem.classList.add("note");
    noteItem.style.backgroundColor = this.addNewBackgroundColor;
    if (note.bgcolor) {
      noteItem.style.backgroundColor = note.bgcolor;
    }
    noteItem.style.backgroundImage = this.addNewBackgroundPattern;
    if (note.bgpattern) {
      noteItem.style.backgroundImage = note.bgpattern;
    }
    notesList.prepend(noteItem);

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

    const icons = [
      {iconName: " add_alert ", iconTooltipText: "Przypomnij mi"},
      {iconName: " person_add ", iconTooltipText: "Współpracownik"},
      {iconName: " palette ", iconTooltipText: "Opcje tła"},
      {iconName: " image ", iconTooltipText: "Dodaj obraz"},
      {iconName: " archive ", iconTooltipText: "Archiwizuj"},
      {iconName: " more_vert ", iconTooltipText: "Więcej"},
    ];

    const noteIconList = document.createElement("div");
    noteIconList.classList.add("note--icons-list__wrapper");
    noteItem.appendChild(noteIconList);

    icons.forEach((iconInfo) => {
      const icon = this.createIconWithTooltip(
        iconInfo.iconName,
        iconInfo.iconTooltipText
      );
      noteIconList.appendChild(icon);
    });
    this.addNewBackgroundColor = "white";
    this.addNewBackgroundPattern = "";
  };
}

class NoteClass implements Note {
  title: string;
  text: string;
  bgcolor: string;
  bgpattern: string;
  pinned: boolean;
  tags: string[];

  constructor( text: string, title: string, bgcolor: string, bgpattern: string, tags: string[]
    ) {
    this.title = title;
    this.text = text;
    this.bgcolor = bgcolor;
    this.bgpattern = bgpattern;
    this.pinned = false;
    this.tags = [...tags];
  }
}

const note = new addNote();
export default note;
