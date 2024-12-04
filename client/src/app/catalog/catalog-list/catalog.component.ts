import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productSubscription: Subscription | null = null;

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.productSubscription = this.apiService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  };

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
