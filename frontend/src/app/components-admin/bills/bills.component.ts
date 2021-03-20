import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { BillsService } from '../services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['../page.component.css'],
})
export class BillsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  bills = [];
  form: FormGroup;
  statusOrder = [
    { id: 1, name: 'Aprobado' },
    { id: 2, name: 'Rechazado' },
    { id: 3, name: 'Pendiente' },
  ];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private billService: BillsService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.initForm();
    this.getBills();
  }
  initForm() {
    this.form = this.fb.group({
      accountNumberStore: [''],
      amount: [''],
      bankAccountHolder: [''],
      bankOfTheStore: [''],
      branchOffice: [''],
      branchOfficeId: [''],
      concept: [''],
      customerAccount: [''],
      dateTime: [''],
      deliveryType: [''],
      deliveryTypeName: [''],
      depositNumber: [''],
      idRequest: ['', Validators.required],
      imageComp: [''],
      requestDetail: [''],
      state: ['', Validators.required],
      statusName: [''],
      typeOfPurchase: [''],
    });
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
  onPost(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    const data = {
      idRequest: form.value.idRequest,
      status: parseInt(form.value.state),
    };
    this.billService.changeStatusRequest(data).subscribe(
      (data) => {
        if (data) {
          Swal.fire({
            icon: 'success',
            text: 'Estado modificado',
          }).then(result => {
            if(result){
              this.closeModal('editBill')
              this.getBills()
            }
          });
        }
      },
      (err) => {
        Swal.fire({
            icon: 'error',
            text: err.error.messages,
          });
        console.error(err);
      }
    );
  }
  getBills() {
    this.billService.getBills().subscribe(
      (data: any) => {
        if (data) {
          this.bills = data.data;
          this.rerender();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  convertToStatus(statusId) {
    for (let i = 0; i < this.statusOrder.length; i++) {
      const status = this.statusOrder[i];
      if (status.id == statusId) {
        return status.name;
      }
    }
  }

  showEditModal(id: string, item) {
    // this.imageSrc = '';
    item.dateTime = this.formatDate(item.dateTime);
    this.form.patchValue(item);
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
  openImage(image) {
    window.open(
      'https://azurefiletestexpress.blob.core.windows.net/comprobantes/' + image
    );
  }
  getNamesProducts(details) {
    let productNames = '';
    for (let i = 0; i < details.length; i++) {
      const product = details[i];
      productNames += product.name + ', ';
    }
    return productNames;
  }
  formatDate(date) {
    const d = new Date(date);
    // return `${d.getDay()}-${d.getMonth()}-${d.getFullYear()}`;
    return d.toLocaleDateString('es-Es');
  }
}
