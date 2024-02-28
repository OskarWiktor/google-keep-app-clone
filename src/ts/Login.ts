import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

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

  protected auth = getAuth();
  protected provider = new GoogleAuthProvider();

  protected userEmail: HTMLElement = document.querySelector(
    ".email--email"
  ) as HTMLElement;
  protected userWelcome: HTMLElement = document.querySelector(
    ".account-edit--welcome"
  ) as HTMLElement;
  protected userPhoto: HTMLElement = document.querySelector(
    ".account--bg"
  ) as HTMLElement;
  protected userPhotoLoginOpen: HTMLElement = document.querySelector(
    ".account-edit--photo"
  ) as HTMLElement;
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
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        this.userEmail.textContent = `${user.email}`;
        this.userWelcome.textContent = `Witaj ${user.displayName},`;
        this.userPhoto.style.backgroundImage = `url(${user.photoURL})`;
        this.userPhotoLoginOpen.style.backgroundImage = `url(${user.photoURL})`;
      })
      .catch((error) => {
        console.log("Error signing in", error);
      });
  }
}
const login = new Login();
