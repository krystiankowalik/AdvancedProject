import Search from './model/Search';
import Recipe from './model/Recipe';
import ShoppingList from './model/ShoppingList';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import {elements, renderLoader, clearLoader} from "./views/base";

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);
        await state.search.getResults();
        console.log(state.search.result);
        searchView.renderResults(state.search.result);
        clearLoader();
    }
};

const controlRecipe = async () => {

    const id = window.location.hash.replace('#', '');

    console.log(id);

    if (id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        state.recipe = new Recipe(id);

        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        state.recipe.calculateServings();
        state.recipe.calculateTime();

        console.log(state.recipe);

        clearLoader();
        recipeView.renderRecipe(state.recipe);


    }


    /*    state.recipe = new Recipe(47746);
        await state.recipe.getRecipe();
        console.log(state.recipe);*/
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.search.addEventListener('click', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultsPages.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    console.log(button);
    if (button) {
        const goToPage = parseInt(button.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
});

// window.addEventListener('hashchange', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// controlRecipe();

const controlShoppingList= ()=> {
    console.log('controller invoked');
    if(!state.shoppingList) state.shoppingList=new ShoppingList();

    state.recipe.ingredients.forEach(el=>{
        const item = state.shoppingList.addItem(el.count,el.unit,el.ingredient);
        shoppingListView.renderItem(item);
    })
};

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('-');
            recipeView.renderRecipe(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('+');
        recipeView.renderRecipe(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlShoppingList();
    }
    // console.log(state.recipe);
});

const list = new ShoppingList();
window.l = list;