import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import Modal from "./Modal";
import Aside from "./Aside";
import Note from "./Note";

class Login {
  private loginWrapper: HTMLElement = document.getElementById( "login-wrapper" ) as HTMLElement;
  private loginOpen: HTMLElement = document.getElementById( "login-open" ) as HTMLElement;
  private loginCloseIcon: HTMLElement = document.getElementById( "login-close" ) as HTMLElement;
  private signInButton: HTMLElement = document.getElementById( "sign-in" ) as HTMLElement;
  private auth = getAuth();
  private provider = new GoogleAuthProvider();

  constructor() {
    this.initEvents();
  }

  private initEvents = (): void => {
    this.loginOpen.addEventListener( "click", this.handleLoginOpen );
    this.loginCloseIcon.addEventListener( "click", this.handleLoginClose );
    document.addEventListener( "click", this.handleDocumentLoginClose );
    this.signInButton.addEventListener( "click", this.handleSignIn ); 
  }

  private handleLoginOpen = (): void => { this.loginWrapper.classList.toggle("active") };
  private handleLoginClose = (): void => { this.loginWrapper.classList.remove("active") };
  private handleDocumentLoginClose = (event: Event): void => {
    if (!this.loginWrapper.contains(event.target as Node) && !this.loginOpen.contains(event.target as Node)) { 
      this.handleLoginClose();
    }
  };
  public handleSignIn = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const user = result.user;
      this.updateUserInterface(user);
      this.writeUserDate(user);
      Modal.modal.close()
    } catch (error) {
      alert(`Nie można się zalogować: ${error}`)
    }
  };
  private updateUserInterface = (user: User): void => {
    const userEmail: HTMLElement = document.querySelector( ".email--email" ) as HTMLElement;
    const userWelcome: HTMLElement = document.querySelector( ".account-edit--welcome" ) as HTMLElement;
    const userPhoto: HTMLImageElement = document.querySelector( ".account--bg" ) as HTMLImageElement;
    const userPhotoLoginOpen: HTMLImageElement = document.querySelector( ".account-edit--photo__wrapper" ) as HTMLImageElement;

    userEmail.textContent = `${user.email}`;
    userWelcome.textContent = `Witaj ${user.displayName},`;
    userPhoto.style.backgroundImage = `url(${user.photoURL})`;
    userPhotoLoginOpen.style.backgroundImage = `url(${user.photoURL})`;
  }
  private writeUserDate = (user: User): void => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);

    update(userRef, {
        username: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
    });
    Aside.fetchTagsFromDatabase()
    Note.fetchNotesFromDatabese()

  }
}
const login = new Login();
export default login;