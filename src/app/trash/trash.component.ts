import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from '../Product-Listing/product';
import { DataService } from '../Shared/Services/data.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})

export class TrashComponent implements OnInit {
  trashedProducts: IProduct[] = [];
 
  constructor(
    private router: Router,
    private dataService: DataService) {
  }
 
  ngOnInit(): void {
    this.getTrashedProdctucts();
  }

  getTrashedProdctucts() {
    this.dataService.getTrashedProducts().subscribe(
      (products: IProduct[]) => {
          this.trashedProducts = products;
      });
  }

  restoreProduct(product) {
    if (product.productId) {
      this.dataService.restoreProduct(product.productId)
                    .subscribe(
                        (data) => {
                           this.onSaveComplete()}
                );
    }
  }

  deleteProduct(product, index) {
        if (product.productId) {
            if (confirm(`Really remove the product: ${product.productName}?`)) {
                this.dataService.removeProduct(index)
                    .subscribe(
                        (data) => this.onSaveComplete(),
                );
            }
        } else {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        }
  }

  onSaveComplete(): void {
    this.getTrashedProdctucts();
    this.router.navigate(['/trash']);
}

}
