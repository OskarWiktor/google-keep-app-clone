class Aside {

    constructor() {
        this.initEvents()
    }
    private initEvents() {

    }
    public createAsideTag = (tag: HTMLElement): void => {
        console.log(tag.textContent)
        const asideWrapper = document.querySelector(".aside") as HTMLElement;
        const asideEditTagsWrapper = document.getElementById('aside__edit-tags--wrapper') as HTMLElement;

        const asideTagWrapper = document.createElement('div');
        asideTagWrapper.className = 'aside--item__wrapper';

        const asideTagIconWrapper = document.createElement('div');
        asideTagIconWrapper.className = 'aside--icon__wrapper';
        asideTagWrapper.append(asideTagIconWrapper);

        const asideTagIcon = document.createElement('span');
        asideTagIcon.className = 'material-symbols-outlined'
        asideTagIcon.textContent = ' label ';
        asideTagIconWrapper.append(asideTagIcon);

        const asideTagText = document.createElement('p')
        asideTagText.className = 'aside--item__text'
        asideTagText.textContent = tag.textContent;
        asideTagWrapper.append(asideTagText);

        asideWrapper.insertBefore(asideTagWrapper, asideEditTagsWrapper);
    }
}

const aside = new Aside();
export default aside;