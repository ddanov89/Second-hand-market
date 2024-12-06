import { Component, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants/constant';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from '../../error-message/error-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  domains = DOMAINS;
  errMessage: string | null = '';
  userSubscription: Subscription | null = null;

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userSubscription = this.userService
      .login(email, password)
      .subscribe({
        next: (user) => {
            this.errMessage="";
            form.reset();
            this.router.navigate(['/home']);
        },
        error: (err) => {
            this.errMessage=err.error?.message;
        }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
