import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private recipesURL: string = 'https://ng-cooking-guide-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes(): void {
    console.log("Store");
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.recipesURL, recipes)
    .subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes(): Observable<Recipe[]> {
    /*
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user: User => {
        return this.http.get<Recipe[]>(
          this.recipesURL,
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
    */

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
      this.recipeService.setRecipes(recipes);
    }));
  }

}
