import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm: NgForm;
  editSub: Subscription;
  editMode: boolean = false;
  editedIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.editSub = this.shoppingListService.editIngredient
      .subscribe((idItem: number) => {
        this.editMode = true;
        this.editedIndex = idItem;
        const ingredient: Ingredient = this.shoppingListService.getIngredient(this.editedIndex);
        this.slForm.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
    });
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe();
  }

  onSubmit():void {
    const newIngredient = new Ingredient(
      this.slForm.value.name, 
      this.slForm.value.amount
    );

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.clearForm();
  }

  clearForm(): void {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.clearForm();
  }
}
