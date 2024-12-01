import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthUser } from '../../types/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  @Input('productProp') product: Product | null = null;
  isUser = false;
  user: AuthUser | null | undefined;
  hasSubscribed = false;
  isOwner = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['productId'];

    this.apiService.getProductDetails(productId).subscribe((product) => {
      this.product = product;
      this.isUser = this.userService.isLogged;

      this.user = this.userService.getUser();

      this.hasSubscribed = Boolean(
        this.product?.subscribers.find(
          (subscriber) => subscriber?._id == this.user?._id
        )
      );
      this.isOwner = this.product?.author.toString() == this.user?._id;
    });
  }

  onSubscribe() {
    const productId = this.route.snapshot.params['productId'];
    this.user = this.userService.getUser();
    const userId = this.user?._id;

    this.apiService.subscribeToProduct(productId, userId).subscribe(() => {
      this.router.navigate([`catalog/${productId}`]);
    });
  }
}
