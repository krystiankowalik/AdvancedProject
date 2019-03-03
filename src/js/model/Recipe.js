import axios from 'axios';
import {key} from '../config';


export default class Recipe {
    constructor(id) {
        this.id = id;
        // this.result =  this.getResults(query);
    }


    async getRecipe() {
        // const key = 'c6a7a46f2bc367fb68aa2c0aaea90f4f';

        try {
            const returned = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            const returnedRecipe = returned.data.recipe
            this.title = returnedRecipe.title;
            this.author = returnedRecipe.publisher;
            this.img = returnedRecipe.image_url;
            this.url = returnedRecipe.source_url;
            this.ingredients = returnedRecipe.ingredients;
        } catch (error) {
            alert(error);
        }

    }

    calculateTime() {
        const numberOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numberOfIngredients / 3);
        this.time = periods * 15;
    }

    calculateServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'cup', 'pound'];
        const newIngredients = this.ingredients.map(el => {

            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            });

            if (ingredient.includes('(') && ingredient.includes(')')) {
                ingredient = ingredient.split('(')[0] + ingredient.split(')')[1];
            }

            const ingredientArray = ingredient.split(' ');
            const unitIndex = ingredientArray.findIndex(el2 => unitsShort.includes(el2));


            let ingredientObject;
            if (unitIndex > -1) {

                const countArray = ingredientArray.slice(0, unitIndex);

                let count;
                if (countArray.length === 1) {
                    count = eval(ingredientArray[0].replace('-', '+'))
                } else {
                    count = eval(ingredientArray.slice(0, unitIndex).join('+'));
                }

                ingredientObject = {
                    count,
                    unit: ingredientArray[unitIndex],
                    ingredient: ingredientArray.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(ingredientArray[0], 10)) {
                ingredientObject = {
                    count: parseInt(ingredientArray[0], 10),
                    unit: '',
                    ingredient: ingredientArray.slice(1).join(' ')
                }
            } else {
                ingredientObject = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return ingredientObject

        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {

        const newServings = type === '-' ? this.servings - 1 : this.servings + 1;

        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }

}
