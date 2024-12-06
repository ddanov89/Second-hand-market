import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessageService } from './error-message.service';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent implements OnInit {

  errorMessage= signal("");

    constructor(private errMsgService: ErrorMessageService, private router: Router) { }

    ngOnInit(): void {
        this.errMsgService.errorMessage$.subscribe((err: any) => {
            this.errorMessage.set(err?.error.message);
        });
    }
}
