import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, Observable, take } from "rxjs";
import { AppState } from "../store/app.reducer";
import { User } from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private store: Store<AppState>) {}

  intercept(request: any, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(stateData => {
        return stateData.user;
      }),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(request);
        }

        const modifiedReq = request.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
