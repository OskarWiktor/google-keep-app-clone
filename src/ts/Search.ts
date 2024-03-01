class Search {
  private searchInput: HTMLInputElement = document.getElementById( "search--input" ) as HTMLInputElement;
  private searchWrapper: HTMLElement = document.querySelector( ".navbar--search__wrapper" ) as HTMLElement;
  private searchIconWrapper: HTMLElement = document.getElementById( "search--icon__wrapper" ) as HTMLElement;
  private searchCrossIconWrapper: HTMLElement = document.getElementById( "search--icon-cross__wrapper" ) as HTMLElement;
  private navbarMenu: HTMLElement = document.getElementById( "navbar--menu" ) as HTMLElement;
  private navbarLogo: HTMLElement = document.getElementById( "navbar--logo" ) as HTMLElement;

  constructor() {
    this.initEvents()
  }

  private initEvents = (): void => {
    this.searchInput.addEventListener( "focus", this.handleSearchInputActive );
    this.searchIconWrapper.addEventListener( "click", this.handleSearchInputActive );
    this.searchCrossIconWrapper.addEventListener( "click", this.handleSearchCrossIcon );
    document.addEventListener( "click", this.handleDocumentClick );
  }
  private handleSearchInputActive = (): void => {
    this.searchWrapper.classList.add("active");
    this.navbarMenu.classList.add("search-active");
    this.navbarLogo.classList.add("search-active");
  }
  private handleSearchCrossIcon = (): void => {
    this.searchWrapper.classList.remove("active");
    this.navbarMenu.classList.remove("search-active");
    this.navbarLogo.classList.remove("search-active");
  }
  private handleDocumentClick = (event: Event): void => {
    if (!this.searchWrapper.contains(event.target as Node)) {
      this.searchWrapper.classList.remove("active");
      this.navbarMenu.classList.remove("search-active");
      this.navbarLogo.classList.remove("search-active");
    }
  }
}

const search = new Search();