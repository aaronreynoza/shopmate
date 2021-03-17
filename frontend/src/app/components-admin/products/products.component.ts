import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../page.component.css'],
})
export class ProductsComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private productService: ProductsService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {}
  products: [];
  ngOnInit(): void {
    this.getProducts();
    this.initEditForm();
  }
  initEditForm() {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: [''],
    });
  }
  getProducts() {
    this.productService.getProducts().subscribe(
      (data: any) => {
        console.log(data);
        this.products = data;
      },
      (error) => console.error(error)
    );
  }
  showModal(id: string, item) {
    console.log(id);
    this.editForm.patchValue(item)
    var modal = document.getElementById(id);
    modal.style.display = 'block';
    console.log(this.editForm.value)
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
  editItem(values) {}
}
