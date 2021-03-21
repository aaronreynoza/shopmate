import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['../page.component.css'],
})
export class CategoriasComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  categories = [];
  form: FormGroup;
  formCreate: FormGroup;
  constructor(
    private productServices: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getCategories();
    this.initForm();
    this.initFormCreate();
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
  initForm() {
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      icon: ['', Validators.required],
      description: [''],
      active: ['1'],
    });
  }
  initFormCreate() {
    this.formCreate = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      icon: ['', Validators.required],
      active: ['1', Validators.required],
    });
  }
  getCategories() {
    this.productServices.getCategories().subscribe((data: any) => {
      if (data) {
        this.categories = data;
        this.rerender();
      }
    });
  }
  showEditModal(id: string, item) {
    this.form.patchValue(item);
    var modal = document.getElementById(id);
    modal.style.display = 'block';
  }
  showCreateModal(id: string) {
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
  onPost(form: FormGroup) {
    if (form.invalid) {
      return alert('Complete formulario');
    }
    this.productServices.modifyCategory(form.value).subscribe((data) => {
      if (data) {
        Swal.fire({
          icon: 'success',
          text: 'Categoria modificada',
        });
        form.reset();
        this.closeModal('editCategory');
        this.getCategories();
      }
    });
  }
  onPostCreate(form: FormGroup) {
    if (form.invalid) {
      return alert('Complete el formulario');
    }
    form.value.name = form.value.name.toUpperCase();
    form.value.active = parseInt(form.value.active);
    this.productServices.createCategory(form.value).subscribe(
      (data: any) => {
        if (data) {
          Swal.fire({
            icon: 'success',
            text: 'Categoria creada',
          });
          form.reset();
          this.closeModal('createCategory');
          this.getCategories();
        }
      },
      (err) => {
        if (err.status == 200) {
          Swal.fire({
            icon: 'success',
            text: 'Categoria creada',
          });
          form.reset();
          this.closeModal('createCategory');
          this.getCategories();
          return;
        }
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'Error creando categoria',
        });
      }
    );
  }
}
