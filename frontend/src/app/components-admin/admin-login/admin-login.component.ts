import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styles: [],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    window.scroll(0, 0);
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recordar: [false],
    });
  }
  navigatePath(path) {}
  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return alert('Complete los campos');
    }
    this.authService.login(form.value).subscribe(
      (data: any) => {
        this.authService.setCurrentUser(data.data);
        this.router.navigate(['admin/facturas']);
      },
      (err) => {
        alert('credenciales incorrectas');
        console.log(err);
      }
    );
  }
}
