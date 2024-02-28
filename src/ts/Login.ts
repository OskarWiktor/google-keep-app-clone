import {getAuth, GoogleAuthProvider, signInWithPopup, User} from "firebase/auth";

class Login {
  protected loginWrapper: HTMLElement = document.getElementById( "login-wrapper" ) as HTMLElement;
  protected loginOpen: HTMLElement = document.getElementById( "login-open" ) as HTMLElement;
  protected loginCloseIcon: HTMLElement = document.getElementById( "login-close" ) as HTMLElement;
  protected signInButton: HTMLElement = document.getElementById( "sign-in" ) as HTMLElement;
  protected auth = getAuth();
  protected provider = new GoogleAuthProvider();

  constructor() {
    this.initEvents();
  }

  protected initEvents(): void {
    this.loginOpen.addEventListener( "click", this.handleLoginOpen );
    this.loginCloseIcon.addEventListener( "click", this.handleLoginClose );
    document.addEventListener( "click", this.handleDocumentLoginClose );
    this.signInButton.addEventListener( "click", this.handleSignIn ); 
  }

  protected handleLoginOpen = (): void => { this.loginWrapper.classList.toggle("active") };
  protected handleLoginClose = (): void => { this.loginWrapper.classList.remove("active") };
  protected handleDocumentLoginClose = (event: Event): void => {
    if (!this.loginWrapper.contains(event.target as Node) && !this.loginOpen.contains(event.target as Node)) { 
      this.handleLoginClose();
    }
  };
  protected handleSignIn = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const user = result.user;
      this.updateUserInterface(user);
    } catch (error) {
      alert(`Nie można się zalogować: ${error}`)
    }
  };
  protected updateUserInterface(user: User): void {
    const userEmail: HTMLElement = document.querySelector( ".email--email" ) as HTMLElement;
    const userWelcome: HTMLElement = document.querySelector( ".account-edit--welcome" ) as HTMLElement;
    const userPhoto: HTMLImageElement = document.querySelector( ".account--bg" ) as HTMLImageElement;
    const userPhotoLoginOpen: HTMLImageElement = document.querySelector( ".account-edit--photo__wrapper" ) as HTMLImageElement;

    userEmail.textContent = `${user.email}`;
    userWelcome.textContent = `Witaj ${user.displayName},`;
    userPhoto.style.backgroundImage = `url(${user.photoURL})`;
    userPhotoLoginOpen.style.backgroundImage = `url(${user.photoURL})`;
  }
}
const login = new Login();