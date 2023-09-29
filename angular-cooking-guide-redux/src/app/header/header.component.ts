import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Subscription } from "rxjs";
import { User } from "../auth/user.model";
import { AppState } from "../store/app.reducer";
import * as RecipesActions from '../recipes/store/recipe.actions';
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isAuthenticated: boolean = false;
  private userSub: Subscription = null;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
    .select('auth')
    .pipe(
      map(stateData => {
        return stateData.user;
      })
    )
    .subscribe((user: User) => {
      this.isAuthenticated = user ? true : false;
      console.log("Header Subscription: this.isAuthenticated", this.isAuthenticated);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData(): void {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData(): void {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
};
