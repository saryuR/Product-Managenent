import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DataService } from './Shared/Services/data.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
// import { ProductData } from './Product-Listing/product-data';
import { ProductListingComponent } from './Product-Listing/product-listing.component';
import { ViewProductDetailsComponent } from './view-product/view-product.component';
import { StarComponent } from './Shared/Component/star/star.component';
import { AddEditProductComponent } from './Product-Listing/add-edit-product/add-edit-product.component';
import { TrashComponent } from './trash/trash.component';

@NgModule({ 
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ViewProductDetailsComponent,
    TrashComponent,
    ProductListingComponent,
    StarComponent,
    AddEditProductComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // HttpClientInMemoryWebApiModule.forRoot(ProductData),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
