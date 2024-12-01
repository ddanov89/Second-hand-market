import { Component, OnInit } from '@angular/core';
import { Product, Profile } from '../../types/product';
import { ApiService } from '../../api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileProducts: Product [] = [];
  email: string | null | undefined = null;

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.apiService.getUserProfile().subscribe((profile) => {
      const user = this.userService.getUser();
      this.email = user?.email;
      this.profileProducts = profile.products;
    });
  }
}
