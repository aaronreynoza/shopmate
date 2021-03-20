import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [],
})
export class OrdersComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  currentUser;
  myOrders;
  constructor(
    private utilService: UtilService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.currentUser = this.utilService.getCurrentUser();
    this.getMyOrders();
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
      productNames += product.image + ',';
    }
    return productNames;
  }
  formatDate(date) {
    const d = new Date(date);
    // return `${d.getDay()}-${d.getMonth()}-${d.getFullYear()}`;
    return d.toLocaleDateString('es-Es');
  }
}
