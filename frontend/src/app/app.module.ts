import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import {IvyCarouselModule} from 'angular-responsive-carousel';


import { LoginComponent } from './components/login/login.component';
import { RegiterComponent } from './components/regiter/regiter.component';
import { ProductComponent } from './components/product/product.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthPipe } from './pipes/auth.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegiterComponent,
    ProductComponent,
    ViewCartComponent,
    SearchComponent,
    CheckoutComponent,
    AuthPipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
