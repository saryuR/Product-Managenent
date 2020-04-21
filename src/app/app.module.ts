//Modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { ProductData } from './Product-Listing/product-data';

//Services
import { DataService } from './Shared/Services/data.service';
import { ErrorServiceService } from './Shared/Services/error-service.service';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/Component/header/header.component';
import { SidebarComponent } from './Shared/Component/sidebar/sidebar.component';
import { FooterComponent } from './Shared/Component/footer/footer.component';
import { ProductListingComponent } from './Product-Listing/product-listing.component';
import { StarComponent } from './Shared/Component/star/star.component';
import { ViewProductDetailsComponent } from './Product-Listing/view-product/view-product.component';
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
  providers: [
    DataService, 
    {
    provide: ErrorHandler,
    useClass: ErrorServiceService,
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
