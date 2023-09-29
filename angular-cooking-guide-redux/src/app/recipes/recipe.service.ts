import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesUpdated: Subject<Recipe[]> = new Subject<Recipe[]>();
  private recipes: Recipe[] = []; /*[
    new Recipe(
      1,
      'Gallo Pinto', 
      'Comida tipica costarricense', 
      'https://laroussecocina.mx/wp-content/uploads/2020/09/gallo_pinto_-_Google_Search.png', 
      [
        new Ingredient('Arroz', 2),
        new Ingredient('Frijoles', 2)
      ]),
    new Recipe(
      2,
      'Hamburguesa',
      'Comida rápida',
      'https://www.cocinayvino.com/wp-content/uploads/2018/02/64513894_ml-e1519846538696-1200x675.jpg',
      [
        new Ingredient('Pan', 2),
        new Ingredient('Tortas de carne', 2),
        new Ingredient('Lechuga', 1),
        new Ingredient('Tomate', 1)
      ]),
    new Recipe(
      3,
      'Tacos',
      'Comida mexicana',
      'https://images-gmi-pmc.edge-generalmills.com/e59f255c-7498-4b84-9c9d-e578bf5d88fc.jpg',
      [
        new Ingredient('Tortillas', 1),
        new Ingredient('Carne', 2),
        new Ingredient('Frijoles', 1)
      ])
  ]*/;

  constructor() {}

  getRecipes(): Recipe[] {
    console.log("this.recipes", this.recipes);
    return this.recipes.slice();
  }

  getRecipeByID(id: number): Recipe {
    return this.recipes.find(recipe => (recipe.id === id));
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    console.log("this.recipes", this.recipes);
    this.emitRecipesUpdated();
  }

  addRecipe(newRecipe: Recipe): void {
    this.recipes.push(newRecipe);
    this.emitRecipesUpdated();
  }

  updateRecipe(id: number, newRecipe: Recipe): void {
    const recipeToUpdateIndex: number = this.recipes.findIndex(recipe => recipe.id === id);
    this.recipes[recipeToUpdateIndex] = newRecipe;
    this.emitRecipesUpdated();
  }

  deleteRecipe(id: number): void {
    const recipeToDeleteIndex: number = this.recipes.findIndex(recipe => recipe.id === id);
    this.recipes.splice(recipeToDeleteIndex, 1);
    this.emitRecipesUpdated();
  }

  private emitRecipesUpdated(): void {
    this.recipesUpdated.next(this.recipes.slice());
  }
  
}