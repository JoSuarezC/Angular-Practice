import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { AuthResponseData, AuthService } from '../auth.service';
import { User } from '../user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// $ means it is an Observable.
@Injectable()
export class AuthEffects {
  signInEndpoint: string =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  environment.firebaseAPIKey;
  signUpEndpoint: string =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  environment.firebaseAPIKey;

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
      .post<AuthResponseData>(
        this.signInEndpoint,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        }
      ).pipe(
        map((responseData: AuthResponseData) => {
          return this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(this.handleError(errorResponse.error.error.message));
        })
      )
    })
  );

  @Effect({dispatch: false})
  authLoginSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap((authData: AuthActions.Login) => {
      authData.payload.redirectTo &&
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
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
          const expiration =
            new Date(userData._tokenExpirationDate).getTime()
            - new Date().getTime();
          this.authService.setExpirationTimer(expiration);
          return new AuthActions.Login({
            user: loadedUser,
            redirectTo: false
          });
        }
      }

      return {type: 'DUMMY'};
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearTokenExpirationTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((authData: AuthActions.SignUpStart) => {
      return this.http
      .post<AuthResponseData>(this.signUpEndpoint, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true,
      })
      .pipe(
        map((responseData: AuthResponseData) => {
          return this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(this.handleError(errorResponse.error.error.message));
        })
      )
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private handleError (
    serverMessage: string
  ): AuthActions.LoginFail {
    let message: string = 'An unknown error occurred.';

    switch (serverMessage) {
      case 'EMAIL_EXISTS':
        message = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        message = 'The email or password is incorrect.';
        break;
    }
    return new AuthActions.LoginFail(message);
  };

  private handleAuthentication (
    email: string,
    id: string,
    token: string,
    expirationSeconds: number
  ): AuthActions.Login {
    const futureExpiration =
      new Date().getTime()
      + expirationSeconds
      * 1000;
    const expirationDate = new Date(futureExpiration);
    const user = new User(
      email,
      id,
      token,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.authService.setExpirationTimer(expirationSeconds * 1000);
    return new AuthActions.Login(
      {
        user: user,
        redirectTo: true
      }
    );
  };
}
