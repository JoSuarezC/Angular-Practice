import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsUpdated: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  editIngredient: Subject<number> = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() {}

  private emitIngredientsUpdated(): void {
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  getIngredients():Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.emitIngredientsUpdated();
  }

  addIngredients(ingredients: Ingredient[]):void {
    this.ingredients.push(...ingredients);
    this.emitIngredientsUpdated();
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.emitIngredientsUpdated();
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.emitIngredientsUpdated();
  }

}