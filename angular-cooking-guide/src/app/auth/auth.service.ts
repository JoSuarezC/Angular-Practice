import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signUpEndpoint: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
    environment.firebaseAPIKey;
  signInEndpoint: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    environment.firebaseAPIKey;
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  tokenExpirationTimer = null;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(
    email: string,
    password: string
  ): Observable<AuthResponseData | string> {
    return this.http
      .post<AuthResponseData>(this.signUpEndpoint, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData: AuthResponseData) => {
          console.log(+responseData.expiresIn);
          console.log(parseInt(responseData.expiresIn));
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  signIn(
    email: string,
    password: string
  ): Observable<AuthResponseData | string> {
    return this.http
      .post<AuthResponseData>(this.signInEndpoint, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData: AuthResponseData) => {
          console.log(+responseData.expiresIn);
          console.log(parseInt(responseData.expiresIn));
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDurationMil: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDurationMil);
  }

  autoLogin(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      const loadedUser: User = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationMiliseconds =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationMiliseconds);
      }
    }
  }

  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expirationSeconds: number
  ): void {
    const futureExpiration = new Date().getTime() + expirationSeconds * 1000;
    const expirationDate = new Date(futureExpiration);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expirationSeconds * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<string> {
    console.log('errorResponse', errorResponse);
    let message: string = '';
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        message = 'The email or password is incorrect.';
        break;
    }

    return throwError(message);
  }
}
