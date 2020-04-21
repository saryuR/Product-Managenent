import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";

import { IProduct } from '../product';
import { DataService } from 'src/app/Shared/Services/data.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  productForm: FormGroup;
  pageTitle: string = 'Product Edit';
  errorMessage: string;
  private originalProduct: IProduct;
  product: IProduct;
  public locationsList = [
    { description: 'Ahmedabad', value: 'ahmedabad' },
    { description: "Gandhinagar", value: 'gandhinagar' },
    { description: "Mehsana", value: 'mehsana' },
    { description: "Vadodara", value: 'vadodara' }
  ];

  public categoryList = [
    { description: 'Tools', value: 'tools' },
    { description: "Entertainment", value: 'entertainment' },
    { description: "Game", value: 'game' },
  ];

  constructor(private fb: FormBuilder,
    private productService: DataService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initProductForm();
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getProduct(id);
      }
    );    
  }


  initProductForm() {
    const formControls = this.locationsList.map(control => new FormControl(false));
    const urlreg=/(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;

    this.productForm = this.fb.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      price: ['', Validators.compose([Validators.required])],
      imageUrl: ['', Validators.compose([Validators.required, Validators.pattern(urlreg)])],
      inStock: ['inStock', Validators.compose([Validators.required])],
      productCode: ['', Validators.compose([Validators.required])],
      starRating: ['', Validators.compose([Validators.required, Validators.max(5), Validators.min(0)])],
      category: ['entertainment', [Validators.required]],
      location: new FormArray(formControls)
    });
  }


  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe(
        product => this.onProductRetrieved(product),
        error => this.errorMessage = <any>error
      );
  }

  onProductRetrieved(product: IProduct): void {
    // Reset back to pristine
    this.productForm.reset();

    // Display the data in the form
    this.originalProduct = product;
    this.product = Object.assign({}, product);
    this.productForm.patchValue(this.product);
    if (this.product.productId === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }
  }

  cancel(): void {
    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  deleteProduct(): void {
    if (this.product.productId) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.productId)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      this.productService.saveProduct(this.productForm.value)
        .subscribe(() => {
          Object.keys(this.productForm.value).forEach(key =>
            this.originalProduct[key] = this.productForm.value[key]
          );
          this.onSaveComplete();
        },
          (error: any) => this.errorMessage = <any>error
        );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset back to pristine
    this.productForm.reset(this.productForm.value);
    // Navigate back to the product list
    this.onBack();
  }

  onBack(): void {
    this.router.navigate(['/product-listing']);
  }
}
