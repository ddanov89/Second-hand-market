import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { Product } from '../../types/product';
import { User } from '../../types/user';
import { UserService } from '../../user/user.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnDestroy {


  searchForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
  });

  searchProducts: Product[] = [];
  // isError = false;
  isSearched = false;

  productSubscription : Subscription | null = null;

  constructor(private apiService: ApiService) {}

  search() {
    let name = this.searchForm.value.name;
    let category = this.searchForm.value.category;

   
    this.productSubscription = this.apiService.searchProducts(name, category).subscribe((products) => {
      this.isSearched = true;
      this.searchProducts = products.products;
    });
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
