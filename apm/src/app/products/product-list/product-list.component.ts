import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { EMPTY, Subscription, catchError, tap } from 'rxjs';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent implements OnInit, OnDestroy{
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage: string = '';
  sub!: Subscription;
  
  private productService = inject(ProductService);
  // Products
  products: Product[] = [];
  
  ngOnInit(): void {
    this.sub = this.productService.getProducts()
    .pipe(
      tap(() => console.log('In component pipeline')),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    ).subscribe({ 
      next: products => this.products = products,
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
