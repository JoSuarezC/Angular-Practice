import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { AppState } from "src/app/store/app.reducer";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
  private recipesURL: string = 'https://ng-cooking-guide-default-rtdb.firebaseio.com/recipes.json';

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(this.recipesURL)
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      })
    }),
    map(recipes => new RecipesActions.SetRecipes(recipes))
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(
      ([actionData, recipesState]) => {
        console.log("Store Recipes", actionData);
        return this.http.put(
          this.recipesURL,
          recipesState.recipes
        );
      }
    )
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>) {}
}
