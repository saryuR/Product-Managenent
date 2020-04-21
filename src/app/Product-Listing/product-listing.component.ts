import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../Shared/Services/data.service';
import { IProduct } from './product';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  filteredProducts: IProduct[];
  products: IProduct[] = [];
  _listFilter: string;
  filter = {
    tools: false, game: false, entertainment: false, ratings: '', inStock: '',
    location: ''
  };

  constructor(
    private router: Router,
    private dataService: DataService) {
  }
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this.listFilter) : this.products;
    this.changeMutliFilters(true, true, true, true, false);
  }

  ngOnInit(): void {
    this.getProdctucts();
  }

  getProdctucts() {
    this.dataService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.filteredProducts = this.products;
      });
  }

  
  likeProduct(product, index) {
    this.filteredProducts[index]['liked'] = this.filteredProducts[index]['liked'] ? false : true;
    this.dataService.likeProduct(product).subscribe(response => {
      this.onSaveComplete();
    });
  }

  deleteProduct(product) {
    if (product.productId) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.dataService.deleteProduct(product.productId)
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
    this.getProdctucts();
  }


  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.filteredProducts.filter((product: IProduct) =>
      JSON.stringify(product).toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  filterChange() {
    if (this.filter.game || this.filter.tools || this.filter.entertainment) {
      this.filteredProducts = this.products.filter((x: any) =>
        ((x.category === 'game' && this.filter.game)
          || (x.category === 'tools' && this.filter.tools)
          || (x.category === 'entertainment' && this.filter.entertainment))
      );
    } else {
      this.filteredProducts = this.products
    }
    this.changeMutliFilters(false, true, true, true, true);
  }

  filterChangeinStock() {
    if (this.filter.inStock) {
      this.filteredProducts = this.products.filter((x: any) =>
        (x.inStock == 'inStock' && this.filter.inStock == 'inStock')
        || (x.inStock == 'notinStock' && this.filter.inStock == 'notinStock'));
    } else {
      this.filteredProducts = this.products;
    }
    this.changeMutliFilters(true, false, true, true, true);
  }

  onChangeProductsLocation() {
    if (this.filter.location) {
      this.filteredProducts = [];
      this.products.forEach((product: any) => {
        if (product.location[parseInt(this.filter.location)] == true) {
          this.filteredProducts.push(product)
        }
      });
    } else {
      this.filteredProducts = this.products;
    }
    this.changeMutliFilters(true, true, true, false, true);
  }

  onChangeStarProducts(stars) {
    if (stars) {
      this.filteredProducts = this.products.filter((product: any) => parseInt(product['starRating']) == parseInt(stars));
    } else {
      this.filteredProducts = this.products;
    }
    this.changeMutliFilters(true, true, false, true, true);
  }

  changeMutliFilters(category, availibility, ratings, location, filter) {
    if (category) {
      if (this.filter.game || this.filter.tools || this.filter.entertainment) {
        this.filteredProducts = this.filteredProducts.filter((x: any) =>
          ((x.category === 'game' && this.filter.game)
            || (x.category === 'tools' && this.filter.tools)
            || (x.category === 'entertainment' && this.filter.entertainment))
        );
      }
    }
    if (availibility) {
      if (this.filter.inStock) {
        this.filteredProducts = this.filteredProducts.filter((x: any) =>
          (x.inStock == 'inStock' && this.filter.inStock == 'inStock')
          || (x.inStock == 'notinStock' && this.filter.inStock == 'notinStock'));
      }
    }
    if (ratings) {
      if (this.filter.ratings) {
        this.filteredProducts = this.filteredProducts.filter((product: any) => parseInt(product['starRating']) == parseInt(this.filter.ratings));
      }
    }
    if (location) {
      if (this.filter.location) {
        this.filteredProducts = this.filteredProducts.filter((product: any) => product.location[this.filter.location] == true);
      }
    }
    if (filter) {
      this.filteredProducts = this._listFilter ? this.performFilter(this.listFilter) : this.filteredProducts;
    }

  }

  navigateToProductDetails(product) {
    this.router.navigate(["view-product-detail", product.productId]);
  }

  navigateToAddEditProduct(id) {
    this.router.navigate(["add-edit-product", id]);
  }



}