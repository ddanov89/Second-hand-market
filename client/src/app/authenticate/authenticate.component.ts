import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnInit, OnDestroy {
  
  isAuthenticating = true;
  userSubscription: Subscription | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.getUserProfile().subscribe({
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
