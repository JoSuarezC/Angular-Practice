import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import { AppState } from "../store/app.reducer";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select('auth').pipe(
        take(1),
        map(stateData => {
          return stateData.user;
        }),
        map((user: User) => {
          const isAuth = user ? true : false;
          console.log("Auth Guard: isAuth", isAuth);
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/login']);
        })
      );
    }
}
