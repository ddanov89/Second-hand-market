import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DOMAINS } from '../../constants/constant';
import { EmailDirective } from '../../directives/email.directive';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from '../../error-message/error-message.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  domains = DOMAINS;

  errMessage: string | null | undefined;

  userSubscription: Subscription | null = null;

  constructor(private userService: UserService, private router: Router) {}

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password, rePass } = form.value;

    this.userSubscription = this.userService
      .register(email!, password!, rePass!)
      .subscribe(() => {
        form.reset();
        this.router.navigate(['/home']);
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
