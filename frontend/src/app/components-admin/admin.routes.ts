import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BillsComponent } from './bills/bills.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PageComponent } from './page.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'admin',
    component: PageComponent,
    children: [
      {
        path: 'facturas',
        component: BillsComponent,
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
      },
      {
        path: 'usuarios',
        component: UsersComponent,
      },
      {
        path: 'productos',
        component: ProductsComponent,
      },
      {
        path: 'login',
        component: AdminLoginComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutes {}
