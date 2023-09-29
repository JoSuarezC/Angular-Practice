import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[]
};

const initialState: State = {
  recipes: []
};

export function recipeReducer(
  state: State = initialState,
  action: RecipeActions.RecipeActions
) {
  switch(action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const clonedRecipes = [...state.recipes];
      const recipeToUpdateIndex: number =
        clonedRecipes.findIndex(
          recipe => recipe.id === action.payload.id
        );
      clonedRecipes[recipeToUpdateIndex] = action.payload.newRecipe;
      return {
        ...state,
        recipes: [...clonedRecipes]
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => {
          return recipe.id !== action.payload;
        })
      };
    case RecipeActions.ADD_RECIPE:
      action.payload.id = state.recipes.length + 1;
      return {
        ...state,
        recipes: [
          ...state.recipes,
          action.payload
        ]
      };
    default:
      return state;
  }
}
