export const elements = {
    search: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResults: document.querySelector('.results'),
    searchResultList: document.querySelector('.results__list'),
    searchResultsPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector(`.shopping__list`)
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
<div class="${elementStrings.loader}">
    <svg>
        <use href="img/icons.svg#icon-cw"></use>
    </svg>
</div>
  `;
    console.log(loader);
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};