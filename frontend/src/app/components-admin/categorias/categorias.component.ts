import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['../page.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

}
