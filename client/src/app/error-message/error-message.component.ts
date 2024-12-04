import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from '../error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent implements OnInit {

  errorMessage: string | null = "";

    constructor(private errService: ErrorMessageService, private router: Router) { }

    ngOnInit(): void {
        this.errService.errorMessage$.subscribe((err) => {
            this.errorMessage = err;
        })
    }

    onBack() {
        if (this.errorMessage == "Resource not found!") {
            this.router.navigate(['/home']);
        } else {
            history.back();
        }
    }
}
