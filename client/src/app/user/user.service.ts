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

  USER_KEY = 'auth-cookie';

  private user: AuthUser | null = null;

  userSubscription: Subscription | null = null;

  get isLogged() {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      this.user$$.next(JSON.parse(savedUser));
    }
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.USER_KEY);
      }
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
      return result;
}

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
