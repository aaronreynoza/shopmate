import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageModule } from './components-admin/page.module';
import { ClientPageModule } from './components/page.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    PageModule,
    ClientPageModule
  ],
  providers: [],
  bootstrap: [
    AppComponent, 
    ],
})
export class AppModule {}
