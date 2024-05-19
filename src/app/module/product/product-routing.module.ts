import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './Components/products-list/products-list.component';

const routes: Routes = [
  { path : "product" , pathMatch : "full" ,redirectTo : "product-list"},
  {path : "product-list" , component : ProductsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
