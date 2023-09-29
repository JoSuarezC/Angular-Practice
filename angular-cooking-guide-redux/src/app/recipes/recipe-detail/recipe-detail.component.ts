import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';
import { map, switchMap } from 'rxjs';
import { DeleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = null;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Way 1
    /*
    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.store
          .select('recipes')
          .pipe(
            map(recipesState => {
              return recipesState.recipes.find(recipe => {
                return recipe.id === id;
              })
            })
          )
          .subscribe((recipe: Recipe) => {
            this.recipe = recipe
          })
      }
    );
    */
   // Way 2
   this.route.params
      .pipe(
        map(params => +params['id']),
        switchMap(id => {
          return this.store
            .select('recipes')
            .pipe(
              map(recipesState => {
                return recipesState.recipes.find(recipe => {
                  return recipe.id === id;
                })
              })
            )
        })
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe
      });
  }

  addToShoppingList(): void {
    //this.slService.addIngredients(this.recipe.ingredients);
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe(): void {
    //this.recipeService.deleteRecipe(this.recipe.id);
    this.store.dispatch(new DeleteRecipe(this.recipe.id));
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
