import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, CurrencyPipe,LoaderComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  isLoading = true;
  productSubscription: Subscription | null = null;

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.productSubscription = this.apiService.getAllProducts().subscribe(products => {
      this.products = products;
      this.isLoading = false;
    });
  };

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
