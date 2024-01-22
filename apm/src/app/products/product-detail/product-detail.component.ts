import { Component, inject } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { EMPTY, catchError, tap } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [AsyncPipe, NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent {
  // Just enough here for the template to compile
  errorMessage = '';

  private productService = inject(ProductService);
  
  // Product to display
  product$ = this.productService.product$
  .pipe(
    tap(() => console.log('In the product details component')),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  )
  
  // Set the page title
  // pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
  pageTitle = 'Product Detail';

  addToCart(product: Product) {
  }
}
