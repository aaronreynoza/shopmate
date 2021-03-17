import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [],
})
export class CheckoutComponent implements OnInit {
  currentUser;
  form: FormGroup;
  imageSrc;
  products = [];
  constructor(
    private utilService: UtilService,
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.currentUser = this.utilService.getCurrentUser();
    this.form.patchValue(this.currentUser);
    this.products = this.utilService.getCart();
  }
  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      delivery_type: ['1', Validators.required],
      location_delivery: ['San Salvador', Validators.required],
      payment_type: ['1', Validators.required],
      cuentaBancaria: ['016401000572839'],
      account_owner: ['', Validators.required],
      description: ['', Validators.required],
      reference_number: ['', Validators.required],
      amount: ['', Validators.required],
      image: ['', Validators.required],
      terms_agree: [false, Validators.requiredTrue],
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.cartService.checkout(form.value).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => console.error(err)
    );
    if (form.invalid) {
      const controls = Object.keys(form.controls);
      for (let i = 0; i < controls.length; i++) {
        const control = controls[i];
        console.log(control, form.controls[control].status);
      }
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos',
      });
      return console.log('please fill all fields');
    }
    console.log(form.value);
  }

  changeImage(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        const formData = new FormData();
        formData.append('image', this.imageSrc);
        console.log(formData);
        this.form.patchValue({ image: formData });

        // this.myForm.patchValue({
        //   fileSource: reader.result
        // });
      };
    }
  }
  subtotal(cartList) {
    let total = 0;
    cartList.forEach((item) => {
      total += item.total;
    });
    return total;
  }
  deleteItemCart(item) {
    this.utilService.deleteItemCart(item);
    this.products = this.utilService.getCart();
    if(!this.products.length){
      this.router.navigate(['store/view-cart'])
    }
  }
  navigateToPath(path) {
    this.router.navigate([path]);
  }
  seeMore(product: any) {
    console.log(product)
    this.router.navigateByUrl(`store/product/${product.product.id}`);
  }
}
