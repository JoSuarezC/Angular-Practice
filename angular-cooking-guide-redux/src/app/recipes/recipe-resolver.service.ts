import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, Observable, of, switchMap, take } from "rxjs";
import { AppState } from "../store/app.reducer";
import { Recipe } from "./recipe.model";

import * as RecipesActions from './store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<Recipe[]> |
    Recipe[] {
      return this.store
        .select('recipes')
        .pipe(
          take(1),
          map(recipesState => {
            console.log("Resolver");
            return recipesState.recipes;
          }),
          switchMap(recipes => {
            if (recipes.length === 0) {
              this.store.dispatch(new RecipesActions.FetchRecipes());
              // Solo para avisar si ya se seteo las recipes.
              return this.actions$.pipe(
                ofType(RecipesActions.SET_RECIPES),
                take(1)
              );
            }
            return of(recipes);
          })
        );
  }
}
