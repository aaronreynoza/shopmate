import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['../page.component.css']
})
export class BillsComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  bills = [
    {
      orderID: '1',
      name: 'order 1',
      details: 'details 1',
      status: '1',
      image:
        'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MXwxMjA3fDF8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      orderID: '2',
      name: 'order 2',
      details: 'details 2',
      status: '2',
      image:
        'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MXwxMjA3fDF8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      orderID: '3',
      name: 'order 3',
      details: 'details 3',
      status: '3',
      image:
        'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MXwxMjA3fDF8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      orderID: '4',
      name: 'order 4',
      details: 'details 4',
      status: '3',
      image:
        'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MXwxMjA3fDF8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      orderID: '5',
      name: 'order 5',
      details: 'details 5',
      status: '3',
      image:
        'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MXwxMjA3fDF8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ];
  statusOrder = [
    { id: 1, name: 'Aprobado' },
    { id: 2, name: 'Rechazado' },
    { id: 3, name: 'Pendiente' },
  ];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      jQueryUI: true,
    };
    console.log(this.route);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  onSaving(event) {
    console.log(event);
  }
  convertToStatus(statusId) {
    for (let i = 0; i < this.statusOrder.length; i++) {
      const status = this.statusOrder[i];
      if(status.id == statusId){
        return status.name
      }
      
    }
  }
}
