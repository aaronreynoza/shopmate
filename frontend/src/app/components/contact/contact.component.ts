import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [],
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private utilService: UtilService) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  onPostSubmit(form: FormGroup) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        text: 'Completa todos los campos',
      });
    }
    this.utilService.sentContactEmail(form.value).subscribe(
      (data) => {
        if (data) {
          Swal.fire({
            icon: 'success',
            text: 'Mensaje enviado',
          });
          this.form.reset();
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          text: 'No se pudo enviar el mensaje',
        });
      }
    );
  }
}
