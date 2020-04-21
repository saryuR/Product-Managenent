import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IProduct } from '../Product-Listing/product';
import { DataService } from '../Shared/Services/data.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductDetailsComponent implements OnInit {
  productId;
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    ) { }
  
  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.productId = +param;
      this.getProduct(this.productId);
    }
  }

  getProduct(id: number) {
    this.dataService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/product-listing']);
  }

  navigateToAddEditProduct() {
    this.router.navigate(["add-edit-product", this.productId]);
  }

}
