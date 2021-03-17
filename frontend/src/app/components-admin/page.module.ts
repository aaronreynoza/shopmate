import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PageComponent } from './page.component';

import { AdminRoutes } from './admin.routes';
import { BillsComponent } from './bills/bills.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductsComponent } from './products/products.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageComponent,
    BillsComponent,
    CategoriasComponent,
    ProductsComponent,
    AdminLoginComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutes,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [HeaderComponent, FooterComponent],
})
export class PageModule {}
