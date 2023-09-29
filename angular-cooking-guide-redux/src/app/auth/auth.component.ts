import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "../store/app.reducer";
import * as fromAuth from './store/auth.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';
  storeSub: Subscription = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(
      (authState: fromAuth.State) => {
        this.isLoading = authState.isLoading;
        this.error = authState.authError;
    });
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    const email: string = authForm.value.email;
    const password: string = authForm.value.password;

    this.isLoginMode
    ? this.store.dispatch(new AuthActions.LoginStart({email, password}))
    : this.store.dispatch(new AuthActions.SignUpStart({email, password}));

    authForm.reset();
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
