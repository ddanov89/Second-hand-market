import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
  });

  searchProducts: Product[] = [];
  // isLoading = false;
  // isError = false;
  isSearched = false;
  // searchedResults: Product[] = [];

  constructor(private apiService: ApiService) {}

  // ngOnInit(): void {
    
  //   this.isSearched = false;
  //   // this.isLoading = true;
  //   this.apiService.getAllProducts().subscribe((products) => {
  //     console.log('Calling from on init', products);
  //     this.searchProducts = products;
      
  //     //   next: (products) => {
  //     //     this.products = products;
  //     //     this.isLoading = false;
  //     //   },
  //     //   error: (err) => {
  //     //     this.isError = true;
  //     //   },
  //   });
  // }

  search() {
    let name = this.searchForm.value.name;
    let category = this.searchForm.value.category;

    // this.isLoading = true;
    this.apiService.searchProducts(name, category).subscribe((products) => {
      this.isSearched = true;
      this.searchProducts = products.products;
    
      
      // next: (products) => {
      //   this.isSearched = true;
      //   this.searchedResults = products;
      //   console.log("The products are: ", products);
      //   this.isLoading = false;
      // },
      // error: (err) => {
      //   console.log("There is an error in search");

      //   this.isLoading = false;
      //   this.isError = true;
      // },
    });
  }
}
