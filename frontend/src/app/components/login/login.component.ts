import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private utilService: UtilService,
    private router: Router
  ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recordar: [false],
    });
  }

  onSubmit(formValue: user) {
    if (this.loginForm.invalid) {
      return;
    }
    const users = this.utilService.getUsers()
      ? this.utilService.getUsers()
      : [{ email: '', password: '', recordar: false }];
    const existUser = users.find(
      (item: user) =>
        item.email == formValue.email && item.password == formValue.password
    );
    if (!existUser) {
      console.log('user no existe')
      return alert('Credenciales Incorrectas');
    }
    this.utilService.setCurrentUser(existUser);
    this.utilService.setStatus(true);
    this.utilService.isLoggedIn(true);
    this.router.navigateByUrl('');
  }
}
