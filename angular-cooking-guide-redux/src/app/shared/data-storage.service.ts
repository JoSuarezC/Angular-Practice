import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, Observable, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import * as RecipesActions from "../recipes/store/recipe.actions";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private recipesURL: string = 'https://ng-cooking-guide-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}

  storeRecipes(): void {
    console.log("Store Recipes");
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.recipesURL, recipes)
    .subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
    .get<Recipe[]>(this.recipesURL)
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      })
    }),
    tap(recipes => {
      //this.recipeService.setRecipes(recipes);
      this.store.dispatch(new RecipesActions.SetRecipes(recipes));
    }));
  }

}
