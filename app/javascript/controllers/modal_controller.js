import { Controller } from "@hotwired/stimulus";
import { Modal } from "bootstrap";

export default class extends Controller {
  static targets = ["modal"];

  connect() {
    console.log('CONNECTED')
    this.modal = new Modal(this.modalTarget);
  }

  show(event) {
    console.log('SHOW')
    event.preventDefault();
    this.modal.show();
  }
}
