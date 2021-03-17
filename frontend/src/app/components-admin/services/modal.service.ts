import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}
  showModal(id: string) {
    console.log(id);
    var modal = document.getElementById(id);
    modal.style.display = 'block';
  }
  closeModal(id: string) {
    var modal = document.getElementById(id);
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];
    modal.style.display = 'none';
    window.onclick = function (event) {
      if (event.target == modal) {
      }
    };
  }
}
