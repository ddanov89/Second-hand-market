import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {

  userSubscription: Subscription | null = null;
  
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userSubscription = this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
