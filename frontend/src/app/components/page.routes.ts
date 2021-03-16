import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page.component';
import { ProductComponent } from './product/product.component';
import { RegiterComponent } from './regiter/regiter.component';
import { SearchComponent } from './search/search.component';
import { ViewCartComponent } from './view-cart/view-cart.component';

const routes: Routes = [
  {
    path: 'store',
    component: PageComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegiterComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'view-cart', component: ViewCartComponent },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
      },
      { path: 'search', component: SearchComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ClientRoutes {}
