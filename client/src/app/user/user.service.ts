import { Injectable, OnDestroy } from '@angular/core';
import { AuthUser, User } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<AuthUser | null>(null);
  private user$ = this.user$$.asObservable();

  private user: AuthUser | null = null;

  userSubscription: Subscription | null = null;

  get isLogged() {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthUser | null>(`/api/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .get<AuthUser | null>('/api/logout')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(email: string, password: string, rePass: string) {
    return this.http
      .post<AuthUser | null>(`/api/register`, { email, password, rePass })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getUser(): AuthUser | null {
    return this.user;
  }

getUserProfile() {
  const result =  this.http.get<AuthUser>(`/api/users/profile`)
      .pipe(tap((user) => this.user$$.next(user)));
      console.log("We are calling profile endpoint", result);
      return result;
}

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
