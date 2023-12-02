class Search {
  protected searchInput: HTMLInputElement = document.getElementById(
    "search--input"
  ) as HTMLInputElement;
  protected searchWrapper: HTMLElement = document.querySelector(
    ".navbar--search__wrapper"
  ) as HTMLElement;
  protected searchIconWrapper: HTMLElement = document.getElementById(
    "search--icon__wrapper"
  ) as HTMLElement;
  protected searchCrossIconWrapper: HTMLElement = document.getElementById(
    "search--icon-cross__wrapper"
  ) as HTMLElement;

  constructor() {
    this.searchInput.addEventListener(
      "focus",
      this.handleSearchInputFocus.bind(this)
    );
    this.searchCrossIconWrapper.addEventListener(
      "click",
      this.handleSearchCrossIcon.bind(this)
    );
  }
  handleSearchInputFocus() {
    this.searchWrapper.classList.add("active");
  }
  handleSearchCrossIcon() {
    this.searchWrapper.classList.remove("active");
  }
}

const search = new Search();