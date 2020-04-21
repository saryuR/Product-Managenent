import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { ProductListingComponent } from './Product-Listing/product-listing.component';
import { ViewProductDetailsComponent } from './Product-Listing/view-product/view-product.component';
import { AddEditProductComponent } from './Product-Listing/add-edit-product/add-edit-product.component';
import { TrashComponent } from './trash/trash.component';

const routes: Routes = [
  { path: '', redirectTo: '/product-listing', pathMatch: 'full' },
  { path: 'product-listing', component: ProductListingComponent},
  { path: 'view-product-detail/:id', component: ViewProductDetailsComponent},
  { path: 'add-edit-product/:id', component: AddEditProductComponent},
  { path: 'trash', component: TrashComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 