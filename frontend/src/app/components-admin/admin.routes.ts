import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillsComponent } from './bills/bills.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PageComponent } from './page.component';

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
    //   {
    //     path: 'bil',
    //     component: BillsComponent,
    //   },
      {
        path: '',
        redirectTo: 'facturas',
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
