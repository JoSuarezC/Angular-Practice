import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { StartEdit } from './store/shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredientsObs: Observable<{ingredients: Ingredient[]}> = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    /*
    this.ingredients = this.shoppingListService.getIngredients();
    this.igUpdatedSubscription = this.shoppingListService.ingredientsUpdated
    .subscribe(
      (updatedIngredients: Ingredient[]) => {
        this.ingredients = updatedIngredients;
      }
    );
    */
    // Dont need to subs coz it is already subscribed in html async
    this.ingredientsObs = this.store.select('shoppingList');
  }

  onEditItem(id: number): void {
    //this.shoppingListService.editIngredient.next(id);
    this.store.dispatch(new StartEdit(id));
  }
}
