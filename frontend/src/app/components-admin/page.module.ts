import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { PageComponent } from './page.component';

import { AdminRoutes } from './admin.routes';
import { BillsComponent } from './bills/bills.component';
import { CategoriasComponent } from './categorias/categorias.component';

@NgModule({
  declarations: [PageComponent, BillsComponent, CategoriasComponent],
  imports: [
    CommonModule,
    AdminRoutes,
    BrowserModule,
    BrowserAnimationsModule,
  ],
})
export class PageModule {}
