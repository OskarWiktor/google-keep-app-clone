import firebase from "firebase/compat/app";

class Login {
  protected loginWrapper: HTMLElement = document.getElementById(
    "login-wrapper"
  ) as HTMLElement;
  protected loginOpen: HTMLElement = document.getElementById(
    "login-open"
  ) as HTMLElement;
  protected loginCloseIcon: HTMLElement = document.getElementById(
    "login-close"
  ) as HTMLElement;

  protected signInButton: HTMLElement = document.getElementById(
    "sign-in"
  ) as HTMLElement;
  protected signOutButton: HTMLElement = document.getElementById(
    "sign-out"
  ) as HTMLElement;
  protected auth = firebase.auth();
  protected provider = new firebase.auth.GoogleAuthProvider();

  constructor() {
    this.loginOpen.addEventListener("click", this.handleLoginOpen.bind(this));
    this.loginCloseIcon.addEventListener(
      "click",
      this.handleLoginClose.bind(this)
    );
    document.addEventListener(
      "click",
      this.handleDocumentLoginClose.bind(this)
    );
    this.signInButton.addEventListener("click", this.handleSignIn.bind(this));
  }
  handleLoginOpen() {
    this.loginWrapper.classList.toggle("active");
  }
  handleLoginClose() {
    this.loginWrapper.classList.remove("active");
  }
  handleDocumentLoginClose(event: Event) {
    if (
      !this.loginWrapper.contains(event.target as Node) &&
      !this.loginOpen.contains(event.target as Node)
    ) {
      this.handleLoginClose();
    }
  }
  handleSignIn() {
    //    this.auth.signInWithPopup(this.provider)
  }
}

const login = new Login();
export default login