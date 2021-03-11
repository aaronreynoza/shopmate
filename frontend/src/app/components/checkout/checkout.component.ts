import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit {
currentUser;
  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
    this.currentUser = this.utilService.getCurrentUser();
  }

}
