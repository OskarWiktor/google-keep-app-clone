class Login {
  protected loginOpen: HTMLElement = document.getElementById(
    "login-open"
  ) as HTMLElement;
  protected loginCloseIcon: HTMLElement = document.getElementById(
    "login-close"
  ) as HTMLElement;

  protected loginWrapper: HTMLElement = document.getElementById(
    "login-wrapper"
  ) as HTMLElement;
  constructor() {
    this.loginOpen.addEventListener("click", this.handleLoginOpen.bind(this));
    this.loginCloseIcon.addEventListener("click", this.handleLoginClose.bind(this))
    document.addEventListener("click", this.handleDocumentLoginClose.bind(this))
  }
  handleLoginOpen() {
    this.loginWrapper.classList.toggle("active");
  }
  handleLoginClose() {
    this.loginWrapper.classList.remove("active")
  }
  handleDocumentLoginClose(event: Event) {
    if(!this.loginWrapper.contains(event.target as Node) && !this.loginOpen.contains(event.target as Node)) {
        this.handleLoginClose();
    }
  }
}

const login = new Login();
