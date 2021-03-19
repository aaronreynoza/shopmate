import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styles: [],
})
export class RegiterComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private utilService: UtilService,
    private router: Router,
    private authService: AuthService
  ) {}

  registerForm: FormGroup;

  ngOnInit(): void {
    window.scroll(0, 0);
    this.registerForm = this.form.group({
      names: ['', Validators.required],
      lastName: ['', Validators.required],
      secondLastName: [''],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      // address: ['', Validators.required],
      // date_of_birth: [''],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Completar campos señalados con *',
      });
      return;
    }
    this.authService.register(form.value).subscribe(
      (data) => {
        if (data) {
          Swal.fire({
            icon: 'warning',
            title: 'Registro exitoso',
            text: 'Se ha enviado un correo de verificacion a tu correo',
          }).then((result) => {
            if (result) {
              delete form.value.password;
              this.utilService.setStatus(true);
              this.utilService.setCurrentUser(form.value);
              this.utilService.isLoggedIn(true);
              this.router.navigate(['store']);
            }
          });
        }
      },
      (err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: err.error.messages,
        });
      }
    );
  }
  navigatePath(path) {
    this.router.navigate([path]);
  }
}
