import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { PageComponent } from './page.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutes } from './page.routes';
import { CheckoutComponent } from './checkout/checkout.component';
import { SearchComponent } from './search/search.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ProductComponent } from './product/product.component';
import { RegiterComponent } from './regiter/regiter.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    PageComponent,
    HomeComponent,
    LoginComponent,
    RegiterComponent,
    ProductComponent,
    ViewCartComponent,
    SearchComponent,
    CheckoutComponent,
    WishlistComponent,
    OrdersComponent,
    ContactComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    ClientRoutes,
    SharedModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    FormsModule,
  ],
  bootstrap: [
    HeaderComponent,
    FooterComponent
  ]
})
export class ClientPageModule {}
