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
  formData: FormData = new FormData();
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
    window.scroll(0, 0);
    this.initForm();
    this.currentUser = this.utilService.getCurrentUser();
    this.form.patchValue(this.currentUser);
    this.form.patchValue({ userName: this.currentUser.names });

    this.products = this.utilService.getCart();
  }
  initForm() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      dateTime: ['', Validators.required],
      branchOfficeId: ['1', Validators.required],
      typeOfPurchase: ['1', Validators.required],
      deliveryType: ['1', Validators.required],
      bankOfTheStore: ['Banco Cuscatlan', Validators.required],
      accountNumberStore: ['016401000572839', Validators.required],
      customerAccount: ['', Validators.required],
      bankAccountHolder: ['', Validators.required],
      concept: ['', Validators.required],
      depositNumber: ['', Validators.required],
      amount: ['', Validators.required],
      image: ['', Validators.required],
      requestDetail: ['', Validators.required],
      terms_agree: [false, Validators.requiredTrue],
    });
  }

  onSubmit(form: FormGroup) {
    const controls = Object.keys(form.controls);
    const date = new Date();
    const requestDetail = [];
    for (let j = 0; j < this.products.length; j++) {
      const product = this.products[j];

      requestDetail.push({
        idProduct: product.product.id,
        productQuantity: product.quantity,
        productPrice: product.product.price,
      });
    }

    form.patchValue({
      requestDetail: JSON.stringify(requestDetail),
      dateTime: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    });

    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos',
      });
      return console.log('please fill all fields');
    }

    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
      if (control !== 'terms_agree') {
        this.formData.append(control, form.controls[control].value);
      }
    }
    this.cartService.checkout(this.formData).subscribe(
      (data) => {
        if (data) {
          Swal.fire({
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Su solicitud sera revisada para su aprobacion',
          }).then((result) => {
            if (result) {
              this.utilService.deleteAllCart();
              this.router.navigate(['store/orders']);
            }
          });
        }
      },
      (err) => console.error(err)
    );
  }

  changeImage(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({ image: file });
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
    if (!this.products.length) {
      this.router.navigate(['store/view-cart']);
    }
  }
  navigateToPath(path) {
    this.router.navigate([path]);
  }
  seeMore(product: any) {
    this.router.navigateByUrl(`store/product/${product.product.id}`);
  }
}
