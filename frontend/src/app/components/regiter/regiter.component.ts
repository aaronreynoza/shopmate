import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-regiter',
  templateUrl: './regiter.component.html',
  styles: [],
})
export class RegiterComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private utilService: UtilService,
    private router: Router
  ) {}

  registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.form.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      date_of_birth: [''],
    });
  }

  onSubmit(formValue: user) {
    if (this.registerForm.invalid) {
      return alert('Formulario no valido');
    }
    const users = this.utilService.getUsers()
      ? this.utilService.getUsers()
      : [{ email: '', password: '', recordar: false }];
    const existUser = users.find((item: user) => item.email == formValue.email);
    if (existUser) {
    alert('Ya esxiste una cuenta con ese email');
    }
    this.utilService.setUsers(formValue);
    this.utilService.setStatus(true);
    this.utilService.setCurrentUser(formValue);
    this.utilService.isLoggedIn(true);
    this.router.navigateByUrl('');
  }
}
