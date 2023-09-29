import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';
  htmlEx = 'Hello <b> user </b>';

  constructor(
    private authService: AuthService,
    private route: Router) {}

  ngOnInit(): void {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    this.isLoading = true;
    const email: string = authForm.value.email;
    const password: string = authForm.value.password;
    const authObs: Observable<AuthResponseData | string> = 
      this.isLoginMode ? 
      this.authService.signIn(email, password)
      : this.authService.signUp(email, password);

    authObs.subscribe(
      response => {
        this.isLoading = false;
        console.log("response", response);
        this.route.navigate(['/recipes']);
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );

    authForm.reset();
  }

  handleErrorClose(): void {
    this.error = '';
  }

}
