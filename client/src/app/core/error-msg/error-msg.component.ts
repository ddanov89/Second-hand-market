import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ErrorMsgService } from './error-msg.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css',
})
export class ErrorMsgComponent implements OnInit, OnDestroy {
  
  errorMsg = signal('');
  userSubscription : Subscription | null = null;
  constructor(private errorMsgService: ErrorMsgService) {}

  ngOnInit(): void {
    this.userSubscription = this.errorMsgService.apiError$.subscribe((err: any) => {
      
      this.errorMsg.set(err?.message);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
