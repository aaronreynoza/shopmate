import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare function init_pluggin();
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route)
    // init_pluggin();
  }

}
