import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, Profile } from '../../types/product';
import { ApiService } from '../../api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {

  
  profileProducts: Product [] = [];
  isError = false;
  email: string | null | undefined = null;

  productSubscription: Subscription | null = null;
  
  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.productSubscription = this.apiService.getUserProfile().subscribe((profile) => {
      const user = this.userService.getUser();
      this.email = user?.email;
      this.profileProducts = profile.products;
      this.isError = true;
    });
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
