
import Aside from  "./Aside";

class Tags {

    public tagList: ({tagText: string, tagId: string})[] = []

    constructor() {
        this.initEvents
    }
    private initEvents = (): void => {

    }
    public addTags = (): void => {
    const addTagsList = document.querySelector( ".add--tag__list" ) as HTMLElement;
    const addTagsButton = document.getElementById( "add-tags-button" ) as HTMLButtonElement;
    const addTagsInput = document.getElementById( "add-tags-input" ) as HTMLInputElement;
    const addTagsValueWrapper = document.querySelector( ".tag--value__wrapper" ) as HTMLElement;
    const addTagsValueSpan = document.querySelector( ".tag--value" ) as HTMLElement;


      addTagsValueWrapper.addEventListener("click", (e) => {
        if (addTagsValueSpan.textContent) { 
        const tagWrapper = document.createElement("div");
        tagWrapper.className = "tag__wrapper";
        addTagsList.appendChild(tagWrapper);

        const tagCheckbox = document.createElement("span");
        tagCheckbox.textContent = " check_box_outline_blank ";
        tagCheckbox.className = "material-symbols-outlined";
        tagWrapper.appendChild(tagCheckbox);

        const tag = document.createElement("p");
        tag.textContent = addTagsValueSpan.textContent;
        tag.className = "tag";
        tagWrapper.appendChild(tag);
        addTagsInput.value = "";
        addTagsValueWrapper.style.display = "none";
        addTagsValueSpan.textContent = addTagsInput.value;

        const maxTagTextLength = 18;
        if (tag.textContent.length > maxTagTextLength) {
          tag.textContent =
            tag.textContent.substring(0, maxTagTextLength) + "..";
        }
        Aside.createAsideTag(tag);

        tagWrapper.addEventListener("click", () => {
          tagCheckbox.classList.toggle("active");
          if (tagCheckbox.classList.contains("active")) {
            tagCheckbox.textContent = " check_box ";

            const activeTagsWrapper = document.querySelector(".add-new__tags--wrapper") as HTMLDivElement;
            const activeTagWrapper = document.createElement("div");
            activeTagWrapper.className = "active-tag__wrapper";
            activeTagsWrapper.appendChild(activeTagWrapper);
            const activeTag = document.createElement("p");
            activeTag.className ="active-tag";
            activeTag.textContent = tag.textContent;
            activeTagWrapper.appendChild(activeTag);
            const activeTagIconWrapper = document.createElement("div");
            activeTagIconWrapper.className = 'active-tag__icon--wrapper';
            activeTagWrapper.appendChild(activeTagIconWrapper);
            const activeTagIcon = document.createElement('span');
            activeTagIcon.className = 'material-symbols-outlined';
            activeTagIcon.textContent = ' close ';
            activeTagIconWrapper.append(activeTagIcon);

            tagWrapper.dataset.activeTagId = activeTagWrapper.id = 'active-tag-'+ Date.now();
            if (tag.textContent) {
              const tagObject = {
                tagText: tag.textContent,
                tagId: activeTagWrapper.id
              };
              this.tagList.push(tagObject);
              console.log(this.tagList);
            }
            activeTagIcon.addEventListener("click", () => {
              activeTagWrapper.remove();
              tagCheckbox.textContent = " check_box_outline_blank ";
            })
          }
          if (!tagCheckbox.classList.contains("active")) {
            tagCheckbox.textContent = " check_box_outline_blank ";
            const activeTagId = tagWrapper.dataset.activeTagId;
            if(activeTagId) {
              const activeTagWrapper = document.getElementById(activeTagId);
              if(activeTagWrapper) {
                activeTagWrapper.remove();
                this.tagList = this.tagList.filter(tagObjects => tagObjects.tagId !== activeTagId);
                console.log(this.tagList);
              }
            }
          }
        });
        }
      });
    };
}

const tags = new Tags;
export default tags