import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
};

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.SLActions) {
    switch(action.type) {
      case ShoppingListActions.ADD_INGREDIENT:
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            action.payload
          ]
        };
      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            ...<Ingredient[]>action.payload
          ]
        };
      case ShoppingListActions.UPDATE_INGREDIENT:
        const updatedIngredients: Ingredient[] =
          updateIngredients(
            state,
            state.editedIngredientIndex,
            action.payload
          );
        return {
          ...state,
          ingredients: updatedIngredients,
          editedIngredient: null,
          editedIngredientIndex: -1
        };
      case ShoppingListActions.DELETE_INGREDIENT:
        const modifiedIngredients = [...state.ingredients];
        modifiedIngredients.splice(state.editedIngredientIndex, 1);
        return {
          ...state,
          ingredients: modifiedIngredients,
          editedIngredient: null,
          editedIngredientIndex: -1
        };
      case ShoppingListActions.START_EDIT:
        return {
          ...state,
          editedIngredientIndex: action.payload,
          editedIngredient: { ...state.ingredients[action.payload] },
        };
      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          editedIngredient: null,
          editedIngredientIndex: -1
        };
      default:
        return state;
    }
}

function updateIngredients(
  state: State,
  index: number,
  newIngredient: Ingredient
): Ingredient[] {
  const ingredient: Ingredient = state.ingredients[index];
  const updatedIngredient: Ingredient = {
    ...ingredient,
    ...newIngredient
  };
  const updatedIngredients: Ingredient[] = [...state.ingredients];
  updatedIngredients[index] = updatedIngredient;
  return updatedIngredients;
}
