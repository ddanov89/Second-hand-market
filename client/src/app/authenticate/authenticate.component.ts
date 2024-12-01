import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnInit {
  
  isAuthenticating = true;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    const user = this.userService.getUser();
    const userId = user?._id;
    this.userService.getUserProfile(userId).subscribe({
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
}
