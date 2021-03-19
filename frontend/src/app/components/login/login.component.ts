import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private utilService: UtilService,
    private router: Router,
    private authService: AuthService
  ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    window.scroll(0, 0);
    this.loginForm = this.form.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recordar: [false],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value).subscribe(
      (data: any) => {
        if (data) {
          data.data.user.names = data.data.user.name;
          this.utilService.setCurrentUser(data.data.user);
          this.utilService.setStatus(true);
          this.utilService.isLoggedIn(true);
          this.router.navigate(['store']);
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en inicio de sesion',
          text: err.error.messages,
        });
      }
    );
  }
  navigatePath(path) {
    this.router.navigate([path]);
  }
}
