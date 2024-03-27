import Aside from "./Aside";

interface Tag {
  tagID: string;
}
class Tags {
  public tagList: Tag[] = [];
  public activeTagList: Tag[] = [];

  constructor() {
    this.initEvents();
  }
  private initEvents = (): void => {};

  public createTags = (): void => {
    const addTagsList = document.querySelector(".add--tag__list") as HTMLElement;
    const addTagsInput = document.getElementById("add-tags-input") as HTMLInputElement;
    const addTagsValueWrapper = document.querySelector(".tag--value__wrapper") as HTMLElement;
    const addTagsValueSpan = document.querySelector(".tag--value") as HTMLElement;

    addTagsValueWrapper.addEventListener("click", () => {
      if (addTagsValueSpan.textContent) {
        //create tag if it has text
        const tagWrapper = document.createElement("div");
        tagWrapper.className = "tag__wrapper";
        addTagsList.appendChild(tagWrapper);

        const tagCheckbox = document.createElement("span");
        tagCheckbox.textContent = " check_box_outline_blank ";
        tagCheckbox.className = "material-symbols-outlined";
        tagWrapper.appendChild(tagCheckbox);

        const tag = document.createElement("p");
        tag.textContent = addTagsValueSpan.textContent;
        tag.id = tag.textContent;
        tag.className = "tag";
        tagWrapper.appendChild(tag);
        addTagsInput.value = "";
        addTagsValueWrapper.style.display = "none";
        addTagsValueSpan.textContent = addTagsInput.value;

        // tag max 18 characters
        const maxTagTextLength = 18;
        if (tag.textContent.length > maxTagTextLength) {
          tag.textContent =
            tag.textContent.substring(0, maxTagTextLength) + "..";
        }
        // create same tag in Aside
        Aside.createAsideTag(tag);
        //ToDo: later for db
        let tagObject: Tag = {
          tagID: tag.textContent,
        };

        this.tagList.push(tagObject);

        tagWrapper.addEventListener("click", () => {
          //change icon on active class
          tagCheckbox.classList.toggle("active");

          if (tagCheckbox.classList.contains("active")) {
            tagCheckbox.textContent = " check_box ";

            // wrapper for all tags in addNewNote
            const activeTagsWrapper = document.querySelector(".add-new__tags--wrapper") as HTMLDivElement;

            // single active tag wrapper
            const activeTagWrapper = document.createElement("div");
            activeTagWrapper.className = "active-tag__wrapper";
            activeTagsWrapper.appendChild(activeTagWrapper);

            // create active tag in addNewNote
            const activeTag = document.createElement("p");
            activeTag.className = "active-tag";
            activeTag.textContent = tag.textContent;
            activeTagWrapper.appendChild(activeTag);

            const activeTagIconWrapper = document.createElement("div");
            activeTagIconWrapper.className = "active-tag__icon--wrapper";
            activeTagWrapper.appendChild(activeTagIconWrapper);

            const activeTagIcon = document.createElement("span");
            activeTagIcon.className = "material-symbols-outlined";
            activeTagIcon.textContent = " close ";
            activeTagIconWrapper.append(activeTagIcon);

            //ToDo: later for db
            let activeTagObject: Tag = {
              tagID: activeTag.textContent as string,
            };

            this.activeTagList.push(activeTagObject);

          } else {
            tagCheckbox.textContent = " check_box_outline_blank ";
            const activeTagText = tag.textContent;
            const activeTagWrappers = document.querySelectorAll(".active-tag__wrapper") as NodeListOf<HTMLDivElement>;
            
            // find activeTagWrapper with activeTag that has same text as activeTagText and remove
            //ToDo: change to remove with activeTagID from activeTagList (after db will be finished)
            activeTagWrappers.forEach(activeTagWrapper => {
                const activeTag = activeTagWrapper.querySelector(".active-tag") as HTMLParagraphElement;
                if (activeTag.textContent === activeTagText) {
                    activeTagWrapper.remove();
                }
            });
          }
        });
      }
    });
  };
}

const tags = new Tags();
export default tags;
