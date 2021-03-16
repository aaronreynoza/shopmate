import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit {
currentUser;
form: FormGroup;
  constructor(private utilService: UtilService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.currentUser = this.utilService.getCurrentUser();
    this.form.patchValue(this.currentUser)
  }
  initForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email,Validators.required]],
      phone: ['', Validators.required],
      cuentaBancaria: []
    })
  }

  onSubmit(form) {
    console.log(form.value);
    }
  

}
