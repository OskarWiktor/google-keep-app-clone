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
  protected navbarMenu: HTMLElement = document.getElementById(
    "navbar--menu"
  ) as HTMLElement;
  protected navbarLogo: HTMLElement = document.getElementById(
    "navbar--logo"
  ) as HTMLElement;

  constructor() {
    this.searchInput.addEventListener(
      "focus",
      this.handleSearchInputActive.bind(this)
    );
    this.searchIconWrapper.addEventListener(
      "click",
      this.handleSearchInputActive.bind(this)
    );

    this.searchCrossIconWrapper.addEventListener(
      "click",
      this.handleSearchCrossIcon.bind(this)
    );
    document.addEventListener("click", this.handleDocumentClick.bind(this));
  }
  handleSearchInputActive() {
    this.searchWrapper.classList.add("active");
    this.navbarMenu.classList.add("search-active");
    this.navbarLogo.classList.add("search-active");
  }
  handleSearchCrossIcon() {
    this.searchWrapper.classList.remove("active");
    this.navbarMenu.classList.remove("search-active");
    this.navbarLogo.classList.remove("search-active");
  }
  handleDocumentClick(event: Event) {
    if (!this.searchWrapper.contains(event.target as Node)) {
      this.searchWrapper.classList.remove("active");
      this.navbarMenu.classList.remove("search-active");
      this.navbarLogo.classList.remove("search-active");
    }
  }
}

const search = new Search();