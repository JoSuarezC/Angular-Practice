import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igUpdatedSubscription: Subscription = null;
  
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igUpdatedSubscription = this.shoppingListService.ingredientsUpdated
      .subscribe(
        (updatedIngredients: Ingredient[]) => {
          this.ingredients = updatedIngredients;
        }
      );
  }

  ngOnDestroy(): void {
    this.igUpdatedSubscription.unsubscribe();
  }

  onEditItem(id: number): void {
    this.shoppingListService.editIngredient.next(id);
  }
}
