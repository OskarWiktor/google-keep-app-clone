import {get, getDatabase, push, ref} from "firebase/database";
import {getAuth} from "firebase/auth";

class Aside {
  private auth = getAuth();

  constructor() {
    this.initEvents();
  }
  private initEvents() {}

  public createAsideTag = (tag: HTMLElement): void => {
    const asideWrapper = document.querySelector(".aside") as HTMLElement;
    const asideEditTagsWrapper = document.getElementById("aside__edit-tags--wrapper") as HTMLElement;

    const asideTagWrapper = document.createElement("div");
    asideTagWrapper.className = "aside--item__wrapper";

    const asideTagIconWrapper = document.createElement("div");
    asideTagIconWrapper.className = "aside--icon__wrapper";
    asideTagWrapper.append(asideTagIconWrapper);

    const asideTagIcon = document.createElement("span");
    asideTagIcon.className = "material-symbols-outlined";
    asideTagIcon.textContent = " label ";
    asideTagIconWrapper.append(asideTagIcon);

    const asideTagText = document.createElement("p");
    asideTagText.className = "aside--item__text";
    asideTagText.textContent = tag.textContent;
    const maxTagTextLength = 18;
    if (asideTagText.textContent) {
      if (asideTagText.textContent.length > maxTagTextLength) {
        asideTagText.textContent =
          asideTagText.textContent.substring(0, maxTagTextLength) + "..";
      }
    }
    asideTagWrapper.append(asideTagText);

    asideWrapper.insertBefore(asideTagWrapper, asideEditTagsWrapper);
    this.createTagsInDatabase(asideTagText.textContent as string);
  };

  private createTagsInDatabase = (tagText: string): void => {
    const db = getDatabase();
    const userId = this.auth.currentUser?.uid;
    const tagsRef = ref(db, `users/${userId}/tags/`);
    push(tagsRef, {
      title: tagText,
    });
  };

  public fetchTagsFromDatabase = async (): Promise<void> => {
    try {
        const db = getDatabase();
        const userId = this.auth.currentUser?.uid;
        const tagsRef = ref(db, `users/${userId}/tags/`);
    
        const snapshot = await get(tagsRef);
        const tagsData = snapshot.val();
        if (tagsData) { 
            const tagsList = Object.keys(tagsData);
            tagsList.forEach((key) => {
                const tag = tagsData[key];
                console.log(tag.title);
                this.createTagsFromDatabase(tag);
            });
        } else {
            console.log("Ten użytkownik nie ma żadnych zapisanych tagów");
        }
    } catch (error) {
        console.log(`Błąd pobierania tagów: ${error}`);
    }
  };

  private createTagsFromDatabase = (tag: HTMLElement): void => {
    const asideWrapper = document.querySelector(".aside") as HTMLElement;
    const asideEditTagsWrapper = document.getElementById("aside__edit-tags--wrapper") as HTMLElement;

    const asideTagWrapper = document.createElement("div");
    asideTagWrapper.className = "aside--item__wrapper";

    const asideTagIconWrapper = document.createElement("div");
    asideTagIconWrapper.className = "aside--icon__wrapper";
    asideTagWrapper.append(asideTagIconWrapper);

    const asideTagIcon = document.createElement("span");
    asideTagIcon.className = "material-symbols-outlined";
    asideTagIcon.textContent = " label ";
    asideTagIconWrapper.append(asideTagIcon);

    const asideTagText = document.createElement("p");
    asideTagText.className = "aside--item__text";
    asideTagText.textContent = tag.title;

    asideTagWrapper.append(asideTagText);

    asideWrapper.insertBefore(asideTagWrapper, asideEditTagsWrapper);
  };
}

const aside = new Aside();
export default aside;
