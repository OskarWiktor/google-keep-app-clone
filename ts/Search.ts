class Search {
  protected searchInput: HTMLInputElement = document.getElementById(
    "search--input"
  ) as HTMLInputElement;
  protected searchWrapper: HTMLElement = document.querySelector(
    ".navbar--search__wrapper"
  ) as HTMLElement;
  protected searchIconWrapper: HTMLElement = document.getElementById("search--icon__wrapper") as HTMLElement;
  protected searchCrossIconWrapper: HTMLElement = document.getElementById("search--icon-cross__wrapper") as HTMLElement;

}