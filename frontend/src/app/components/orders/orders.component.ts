import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['../page.component.css'],
})
export class OrdersComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  currentUser;
  myOrders;
  form: FormGroup
  constructor(
    private utilService: UtilService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.currentUser = this.utilService.getCurrentUser();
    this.getMyOrders();
    this.initForm()
  }
  onPost(){}
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

  refreshOrders() {
    this.getMyOrders();
  }

  getMyOrders() {
    this.authService.myOrders(this.currentUser.email).subscribe(
      (data: any) => {
        if (data) {
          this.myOrders = data.data;
          this.rerender();
        }
      },
      (err) => {
        console.error(err);
      }
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
}
