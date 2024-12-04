import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnInit, OnDestroy {
  isAuthenticating = true;
  userSubscription: Subscription | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    const userId = user?._id;
    this.userSubscription = this.userService.getUserProfile(userId).subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error: (err) => {
        this.isAuthenticating = false;
      },
      complete: () => {
        this.isAuthenticating = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
