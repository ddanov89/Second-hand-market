import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants/constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {

  domains = DOMAINS;
  userSubscription: Subscription | null = null;
  
  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userSubscription = this.userService.login(email, password).subscribe((user) => {
      form.reset();
      this.router.navigate(['/home']);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
