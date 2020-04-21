import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/Product-Listing/product';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private products: IProduct[];
  private trash_products: IProduct[];
  constructor() { }

  getProducts(): Observable<IProduct[]> {
    if (this.products) {
      return of(this.products);
    }
    this.products = this.getRequestedStorage('products');
    return of(this.products)
  }

  getTrashedProducts(): Observable<IProduct[]> {
    if (this.trash_products) {
      return of(this.trash_products);
    }
    this.trash_products = this.getRequestedStorage('trash_products');
    return of(this.trash_products)
  }


  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    this.products = this.getRequestedStorage('products');
    if (this.products) {
      const foundItem = this.products.find(item => item.productId === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
  }


  getTrashedProduct(id: number): Observable<any> {
    this.trash_products = this.getRequestedStorage('trash_products');
    if (this.trash_products) {
      const foundItem = this.trash_products.find(item => item.productId === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
  }

  saveProduct(product: IProduct): Observable<IProduct[]> {
    if (product.productId === 0) {
      return this.createProduct(product);
    }
    return this.updateProduct(product);
  }

  getRequestedStorage(name) {
    return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : [];
  }

  deleteProduct(id: number): Observable<IProduct[]> {
    this.products = this.getRequestedStorage('products');
    if (this.products) {
      this.trash_products = this.getRequestedStorage('trash_products');
      this.trash_products.push(this.products.find(item => item.productId === id));
      this.products = this.products.filter(item => item.productId !== id);
      localStorage.setItem('products', JSON.stringify(this.products));
      localStorage.setItem('trash_products', JSON.stringify(this.trash_products));
      return of(this.products);
    }
  }

  removeProduct(index): Observable<IProduct[]> {
    this.trash_products = this.getRequestedStorage('trash_products');
    if (this.trash_products) {
      this.trash_products.splice(index, 1);
      localStorage.setItem('trash_products', JSON.stringify(this.trash_products));
    }
    return of(this.trash_products);
  }

  restoreProduct(id: number): Observable<IProduct[]> {
    this.products = this.getRequestedStorage('products');
      this.trash_products = this.getRequestedStorage('trash_products');
      if (this.trash_products) {
        this.products.push(this.trash_products.find(item => item.productId === id));
      }
      this.trash_products = this.trash_products.filter(item => item.productId !== id);
      localStorage.setItem('trash_products', JSON.stringify(this.trash_products));
      localStorage.setItem('products', JSON.stringify(this.products));
      return of(this.trash_products);
  }

  private createProduct(product: IProduct): Observable<IProduct[]> {
    product.productId = Math.floor(Math.random() * 10) + 6;
    this.products = this.getRequestedStorage('products');
    this.products.push(product);
    localStorage.setItem('products', JSON.stringify(this.products));
    return of(this.products);
  }

  private updateProduct(product: IProduct): Observable<IProduct[]> {
    this.products = this.getRequestedStorage('products');
    this.products.map((productItem, i) => {
      if (productItem.productId == product.productId) {
        this.products[i] = product;
      }
    });
    localStorage.setItem('products', JSON.stringify(this.products));
    return of(this.products);
  }

  likeProduct(product: IProduct): Observable<IProduct[]> {
    this.updateProduct(product);
    return of(this.products);
  }


  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
      productId: 0,
      productName: '',
      productCode: '',
      category: 'entertainment',
      tags: [],
      releaseDate: new Date().toString(),
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: '',
      inStock: 'inStock'
    };
  }


}


  // uncomment below code if you want to use In Memory Web Api for product operations but data will be erased on refresh of page 

  // private productsUrl = 'api/products';
  // private products: IProduct[];

  // constructor(private http: HttpClient) { }
  // private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
  // selectedProductChanges$ = this.selectedProductSource.asObservable();

  // changeSelectedProduct(selectedProduct: IProduct | null): void {
  //   this.selectedProductSource.next(selectedProduct);
  // }

  // getProducts(): Observable<IProduct[]> {
  //   if (this.products) {
  //     return of(this.products);
  //   }
  //   return this.http.get<IProduct[]>(this.productsUrl)
  //     .pipe(
  //       tap(data => console.log(JSON.stringify(data))),
  //       tap(data => this.products = data),
  //       catchError(this.handleError)
  //     );
  // }

  // getProduct(id: number): Observable<IProduct> {
  //   if (id === 0) {
  //     return of(this.initializeProduct());
  //   }
  //   if (this.products) {
  //     const foundItem = this.products.find(item => item.productId === id);
  //     if (foundItem) {
  //       return of(foundItem);
  //     }
  //   }
  //   const url = `${this.productsUrl}/${id}`;
  //   return this.http.get<IProduct>(url)
  //     .pipe(
  //       tap(data => console.log('Data: ' + JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

  // saveProduct(product: IProduct): Observable<IProduct> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   if (product.productId === 0) {
  //     return this.createProduct(product, headers);
  //   }
  //   return this.updateProduct(product, headers);
  // }

  // deleteProduct(id: number): Observable<IProduct> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const url = `${this.productsUrl}/${id}`;
  //   return this.http.delete<IProduct>(url, { headers: headers })
  //     .pipe(
  //       tap(data => console.log('deleteProduct: ' + id)),
  //       tap(data => {
  //         const foundIndex = this.products.findIndex(item => item.productId === id);
  //         if (foundIndex > -1) {
  //           this.products.splice(foundIndex, 1);
  //           this.changeSelectedProduct(null);
  //         }
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  // private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
  //   product.productId = Math.floor(Math.random() * 10);
  //   product['id'] = Math.floor(Math.random() * 10);
  //   return this.http.post<IProduct>(this.productsUrl, product, { headers: headers })
  //     .pipe(
  //       tap(data => console.log('createProduct: ' + JSON.stringify(data))),
  //       tap(data => {
  //         this.getProducts().subscribe( (products: any)=> {
  //           this.products = products;
  //           this.products.push(data);
  //         });
  //         this.changeSelectedProduct(data);
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  // private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
  //   const url = `${this.productsUrl}/${product.productId}`;
  //   product['id'] = product.productId;
  //   return this.http.put<IProduct>(url, product, { headers: headers })
  //     .pipe(
  //       tap(data => console.log('updateProduct: ' + product.productId)),
  //       catchError(this.handleError)
  //     );
  // }

  // private handleError(err: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }