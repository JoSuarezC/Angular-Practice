import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeID: number = null;
  editMode: boolean = false;
  recipeForm: FormGroup = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeID = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(): void {
    let recipeName: string = '';
    let imageURL: string = '';
    let description: string = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (this.editMode) {
      const editedRecipe = this.recipeService.getRecipeByID(this.recipeID);
      recipeName = editedRecipe.name;
      imageURL = editedRecipe.imagePath;
      description = editedRecipe.description;
      if (editedRecipe.ingredients !== []) {
        for(let ingredient of editedRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(imageURL, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'ingredients': recipeIngredients
    });

  }

  onSubmit(): void {
    const submitedValues = this.recipeForm.value;
    console.log("Recipe edit");

    if (this.editMode) {
      submitedValues.id = this.recipeID;
      this.recipeService.updateRecipe(this.recipeID, submitedValues);
    } else {
      submitedValues.id = this.recipeService.getRecipes().length + 1;
      this.recipeService.addRecipe(submitedValues); 
    }

    this.returnToList();
  }

  returnToList(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

}
