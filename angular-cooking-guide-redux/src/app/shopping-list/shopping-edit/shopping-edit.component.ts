import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm: NgForm;
  editSub: Subscription = null;
  editMode: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.editSub = this.store.select('shoppingList').subscribe(
      stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.slForm.form.setValue({
            name: stateData.editedIngredient.name,
            amount: stateData.editedIngredient.amount
          });
        } else {
          this.editMode = false;
        }
      }
    )
    /*this.editSub = this.shoppingListService.editIngredient
      .subscribe((idItem: number) => {
        this.editMode = true;
        this.editedIndex = idItem;
        const ingredient: Ingredient = this.shoppingListService.getIngredient(this.editedIndex);
        this.slForm.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
    });*/
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }

  clearForm(): void {
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.slForm.reset();
  }

  onSubmit():void {
    const newIngredient = new Ingredient(
      this.slForm.value.name,
      this.slForm.value.amount
    );

    if (this.editMode) {
      //this.shoppingListService.updateIngredient(this.editedIndex, newIngredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(
          newIngredient
        )
      );
    } else {
      //this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(
          newIngredient
        )
      );
    }

    this.clearForm();
  }

  onDelete(): void {
    //this.shoppingListService.deleteIngredient(this.editedIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
    this.clearForm();
  }
}
