import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
  recipesAdded = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Mango Lassi',
  //     'A super tasty Mango Lassi -- just superb!!',
  //     'https://www.whiskaffair.com/wp-content/uploads/2019/05/Mango-Lassi-1-3.jpg',
  //     [new Ingredient('mangoes', 2), new Ingredient('youghurt', 1)]
  //   ),

  //   new Recipe(
  //     'Palak Paneer',
  //     'A simply superb combination of Palak and Paneer',
  //     'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2013/05/palak-paneer-easy.jpg',
  //     [new Ingredient('paneer', 20), new Ingredient('palak', 5)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesAdded.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesAdded.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesAdded.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesAdded.next(this.recipes.slice());
  }
}
