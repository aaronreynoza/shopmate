import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { ModalService } from '../services/modal.service';
import { ProductsService } from '../services/products.service';
declare var $;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../page.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  editForm: FormGroup;
  formData: FormData = new FormData();
  createForm: FormGroup;
  categories = [];
  providers = [];
  imageSrc;
  specifications: any = {};
  specificationsArray: any = [];
  constructor(
    private productService: ProductsService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {}
  products: [];
  ngOnInit(): void {
    window.scroll(0, 0);
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getProducts();
    this.initEditForm();
    this.initCreateForm();
    this.getCategories();
    this.getProviders();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  initEditForm() {
    this.editForm = this.fb.group({
      id_producto: ['', Validators.required],
      nombre_prod: ['', Validators.required],
      precio_venta: ['', Validators.required],
      imagen: ['', Validators.required],
      imagenUpload: [''],
      fk_id_categoria: ['', Validators.required],
      fk_id_proveedor: ['', Validators.required],
    });
  }
  initCreateForm() {
    this.createForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      provider: ['', Validators.required],
      quantity: ['', Validators.required],
      specifications: ['', Validators.required],
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
  showEditModal(id: string, item) {
    this.imageSrc = '';
    this.editForm.patchValue(item);
    var modal = document.getElementById(id);
    modal.style.display = 'block';
  }
  showCreateModal(id: string) {
    this.imageSrc = '';
    var modal = document.getElementById(id);
    modal.style.display = 'block';
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
  editItem(editForm: FormGroup) {
    console.log(editForm.value);
  }
  createItem(createForm: FormGroup) {
    const controls = Object.keys(createForm.controls);
    if (createForm.invalid) {
      console.log(createForm.value)
      Swal.fire({
        icon: 'error',
        text: 'Completa todos los campos',
      });
      return;
    }
    // createForm.controls.provider.setValue('Compumax');
    // createForm.controls.category.setValue('SSD');
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
      // if (control !== 'image') {
      this.formData.append(control, createForm.value[control]);
      // }
    }
    this.productService.createProduct(this.formData).subscribe(
      (data: any) => {
        if (data) {
          Swal.fire({
            icon: 'success',
            text: data.message,
          }).then((result) => {
            if (result) {
              this.closeModal('createProduct');
              this.getProducts();
              this.rerender();
            }
          });
        }
      },
      (err) => console.log(err)
    );
  }
  getCategories() {
    this.productService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (err) => console.error(err)
    );
  }
  getProviders() {
    this.productService.getProviders().subscribe(
      (data: any) => {
        this.providers = data;
      },
      (err) => console.error(err)
    );
  }
  changeImage(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.imageSrc = reader.result as string;
        // this.formData.append('image', file);
        this.createForm.patchValue({ image: file });
      };
    }
  }
  addSpecification() {
    const $fieldName = $('#fieldName');
    const $fieldValue = $('#fieldValue');
    if ($fieldName.val() == '') {
      return;
    }
    this.specifications[`${$fieldName.val()}`] = $fieldValue.val();
    const fields = Object.keys(this.specifications);
    this.specificationsArray = [];
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      this.specificationsArray.push({
        name: field,
        value: this.specifications[field],
      });
    }
    $fieldName.val('');
    $fieldValue.val('');
    const specs = this.createForm.patchValue({
      specifications: JSON.stringify(this.specifications),
    });
  }
  deleteSpec(item) {
    delete this.specifications[item.name];
    this.specificationsArray = this.specificationsArray.filter((spec) => {
      if (spec.name !== item.name) {
        return spec;
      }
    });
  }
  updateList(){
    this.getProducts();
    this.rerender();
  }
}
