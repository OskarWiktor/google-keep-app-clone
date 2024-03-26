import Login from "./Login";

class Modal {
  public modal = document.querySelector(".modal") as HTMLDialogElement;
  private modalLoginButton = document.querySelector(".modal--login-btn") as HTMLButtonElement;

  constructor() {
    this.openModal()
    this.modalLoginButton.addEventListener("click", this.login)
  }
  public openModal = (): void => {
    this.modal.showModal();
  }

  private login = ():void => {
    Login.handleSignIn();
  }
}

const modal = new Modal();
export default modal;