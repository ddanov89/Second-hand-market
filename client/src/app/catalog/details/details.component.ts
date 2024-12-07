import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthUser, User } from '../../types/user';
import { UserService } from '../../user/user.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  @Input('productProp') product: Product | null = null;
  isUser = false;
  user: AuthUser | null | undefined;
  hasSubscribed = false;
  isOwner = false;

  totalSubs = 0;

  productSubscription: Subscription | null = null;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['productId'];

    this.productSubscription = this.apiService
      .getProductDetails(productId)
      .subscribe((product) => {
        this.product = product;
        this.totalSubs = product.subscribers.length;
        this.isUser = this.userService.isLogged;

        this.user = this.userService.getUser();

        this.hasSubscribed = Boolean(
          this.product?.subscribers.find(
            (subscriber) => subscriber?.toString() == this.user?._id
          )
        );
        this.isOwner = this.product?.author.toString() == this.user?._id;
      });
  }

  getAllSubscribers() {
    const productId = this.route.snapshot.params['productId'];
    this.user = this.userService.getUser();
    const userId = this.user?._id;

    this.productSubscription = this.apiService
      .getProductDetails(productId)
      .subscribe((product) => {
        this.totalSubs = product.subscribers.length;
      });
  }

  onSubscribe(event: Event) {
    event.preventDefault();

    const productId = this.route.snapshot.params['productId'];
    this.user = this.userService.getUser();
    const userId = this.user?._id;

    this.productSubscription = this.apiService
      .subscribeToProduct(productId, userId)
      .subscribe((sub) => {
        this.hasSubscribed = true;
        this.getAllSubscribers();
        this.router.navigate([`catalog/${productId}`]);
      });
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
