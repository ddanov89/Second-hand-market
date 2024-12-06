import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private errorMessage$$ = new BehaviorSubject<string | null>(null);
  public errorMessage$ = this.errorMessage$$.asObservable();

  constructor() { }

  setError(err:any): void {
      this.errorMessage$$.next(err);
  }
}
